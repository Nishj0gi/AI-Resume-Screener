from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

import shutil
import os
import models
import schemas

from database import SessionLocal
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


# Database dependency
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
    db: Session = Depends(get_db)
):

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
        user_id=1
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
    db: Session = Depends(get_db)
):

    # Get the most recently uploaded resume
    resume = (
        db.query(models.Resume)
        .order_by(models.Resume.id.desc())
        .first()
    )

    # Check whether a resume exists
    if not resume:
        return {
            "error": "No resume uploaded. Please upload a resume first."
        }

    # Get stored resume file path
    file_path = resume.filepath

    # Check whether the file exists
    if not os.path.exists(file_path):
        return {
            "error": "Resume file not found."
        }

    # Extract resume text
    resume_text = extract_text(file_path)

    # Match resume skills with job skills
    result = match_resume_with_job(
        resume_text,
        request.job_description
    )

    # Calculate overall resume score
    resume_score = calculate_resume_score(
        resume_text,
        result["match_percentage"]
    )

    # Add resume score to existing result
    result["resume_score"] = resume_score

    return result