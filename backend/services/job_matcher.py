from services.resume_analyzer import extract_skills


def match_resume_with_job(resume_text, job_description):

    # Extract skills from resume
    resume_skills = extract_skills(resume_text)

    # Extract required skills from job description
    job_skills = extract_skills(job_description)

    matched = []
    missing = []

    # Compare skills
    for skill in job_skills:

        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    # Calculate match percentage
    if len(job_skills) == 0:
        match_percentage = 0
    else:
        match_percentage = round(
            len(matched) / len(job_skills) * 100,
            2
        )

    # Generate recommendations
    recommendations = []

    for skill in missing:

        recommendations.append(
            f"Consider learning {skill} and adding a relevant project or experience to your resume."
        )

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched,
        "missing_skills": missing,
        "match_percentage": match_percentage,
        "recommendations": recommendations
    }