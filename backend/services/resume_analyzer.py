def extract_skills(text):
    skills_database = [
        "Python",
        "Java",
        "C++",
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "FastAPI",
        "SpringBoot",
        "HTML",
        "CSS",
        "TailwindCSS",
        "MongoDB",
        "MariaDB",
        "Git",
        "GitHub"
    ]

    found_skills = []

    text_lower = text.lower()

    for skill in skills_database:
        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills


def calculate_resume_score(resume_text, match_percentage):
    text_lower = resume_text.lower()

    sections = {
        "summary": ["about me", "summary", "profile"],
        "education": ["education"],
        "experience": ["experience", "internship"],
        "skills": ["skills", "technical skills"],
        "projects": ["projects", "project"],
        "certifications": ["certifications", "certification"],
        "achievements": ["achievements", "achievement"]
    }

    section_score = 0
    found_sections = []

    for section, keywords in sections.items():

        found = False

        for keyword in keywords:
            if keyword in text_lower:
                found = True
                break

        if found:
            section_score += 1
            found_sections.append(section)

    total_sections = len(sections)

    content_score = round(
        (section_score / total_sections) * 40,
        2
    )

    skill_score = round(
        match_percentage * 0.60,
        2
    )

    resume_score = round(
        content_score + skill_score,
        2
    )

    return {
        "resume_score": resume_score,
        "content_score": content_score,
        "skill_score": skill_score,
        "sections_found": found_sections,
        "sections_total": total_sections
    }