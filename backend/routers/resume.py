from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

import shutil
import os
import json

import models
import schemas

from database import SessionLocal
from auth import get_current_user

from services.pdf_service import extract_text
from services.resume_analyzer import (
    extract_skills,
    calculate_resume_score
)
from services.job_matcher import match_resume_with_job


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"


# ---------------------------------------------------------
# Database dependency
# ---------------------------------------------------------

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------
# Upload Resume
# ---------------------------------------------------------

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    # Check file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Find logged-in user
    user = (
        db.query(models.User)
        .filter(models.User.email == current_user)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Create uploads folder if it doesn't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Create file path
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Extract text from PDF
    resume_text = extract_text(file_path)

    # Extract skills
    skills = extract_skills(resume_text)

    # Save resume information in database
    resume = models.Resume(
        filename=file.filename,
        filepath=file_path,
        user_id=user.id
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "skills": skills,
        "text": resume_text
    }


# ---------------------------------------------------------
# Match Resume With Job Description
# ---------------------------------------------------------

@router.post("/match")
async def match_resume(
    request: schemas.JobDescriptionRequest,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    # Find logged-in user
    user = (
        db.query(models.User)
        .filter(models.User.email == current_user)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Get the most recently uploaded resume
    # belonging to the logged-in user
    resume = (
        db.query(models.Resume)
        .filter(models.Resume.user_id == user.id)
        .order_by(models.Resume.id.desc())
        .first()
    )

    # Check whether a resume exists
    if not resume:
        raise HTTPException(
            status_code=404,
            detail="No resume uploaded. Please upload a resume first."
        )

    # Get stored resume file path
    file_path = resume.filepath

    # Check whether the file exists
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Resume file not found."
        )

    # Extract resume text
    resume_text = extract_text(file_path)

    # Match resume with job description
    result = match_resume_with_job(
        resume_text,
        request.job_description
    )

    # -----------------------------------------------------
    # Calculate Resume Score
    # -----------------------------------------------------

    resume_score_details = calculate_resume_score(
        resume_text,
        result["match_percentage"]
    )

    # Extract numeric overall resume score
    score_value = resume_score_details["resume_score"]

    # IMPORTANT:
    # Keep resume_score as a number.
    # Sending the whole dictionary here would cause
    # "Objects are not valid as a React child".
    result["resume_score"] = score_value

    # Send detailed scoring information separately
    result["content_score"] = resume_score_details["content_score"]

    result["skill_score"] = resume_score_details["skill_score"]

    result["sections_found"] = resume_score_details["sections_found"]

    result["sections_total"] = resume_score_details["sections_total"]

    # -----------------------------------------------------
    # Save Job Match Result
    # -----------------------------------------------------

    job_match = models.JobMatch(
        user_id=user.id,
        resume_id=resume.id,
        job_description=request.job_description,
        match_percentage=result["match_percentage"],
        resume_score=score_value,
        matched_skills=json.dumps(
            result.get("matched_skills", [])
        ),
        missing_skills=json.dumps(
            result.get("missing_skills", [])
        )
    )

    db.add(job_match)

    db.commit()

    db.refresh(job_match)

    # -----------------------------------------------------
    # Return Complete Analysis
    # -----------------------------------------------------

    return result


# ---------------------------------------------------------
# Dashboard Data
# ---------------------------------------------------------

@router.get(
    "/dashboard",
    response_model=schemas.DashboardResponse
)
async def get_dashboard_data(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    # Find logged-in user
    user = (
        db.query(models.User)
        .filter(models.User.email == current_user)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    # Get latest resume belonging to this user
    resume = (
        db.query(models.Resume)
        .filter(models.Resume.user_id == user.id)
        .order_by(models.Resume.id.desc())
        .first()
    )

    # Get latest job match belonging to this user
    job_match = (
        db.query(models.JobMatch)
        .filter(models.JobMatch.user_id == user.id)
        .order_by(models.JobMatch.id.desc())
        .first()
    )

    # -----------------------------------------------------
    # No resume yet
    # -----------------------------------------------------

    if not resume:
        return {
            "resume_score": None,
            "latest_job_match": None,
            "detected_skills": 0,
            "has_resume": False,
            "has_job_match": False
        }

    # Extract current resume text and skills
    resume_text = extract_text(resume.filepath)

    skills = extract_skills(resume_text)

    # -----------------------------------------------------
    # Resume exists but no job match yet
    # -----------------------------------------------------

    if not job_match:
        return {
            "resume_score": None,
            "latest_job_match": None,
            "detected_skills": len(skills),
            "has_resume": True,
            "has_job_match": False
        }

    # -----------------------------------------------------
    # Resume + job match both exist
    # -----------------------------------------------------

    return {
        "resume_score": job_match.resume_score,
        "latest_job_match": job_match.match_percentage,
        "detected_skills": len(skills),
        "has_resume": True,
        "has_job_match": True
    }