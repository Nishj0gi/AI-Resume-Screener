# 🔍 TalentLens — AI Resume Screener

> A full-stack AI-powered resume screening platform that analyzes resumes, detects skills, matches them against job descriptions, and gives candidates an actionable resume score.

---

## 🌐 Live Demo

👉 **[View Live App](https://ai-resume-screener-ten-rho.vercel.app/)** ⚡

| Part | Link |
|------|------|
| 🖥️ Frontend (Vercel) | https://ai-resume-screener-ten-rho.vercel.app/ |
| ⚙️ Backend API (Render) | https://ai-resume-screener-backend-ok11.onrender.com |
| 📖 API Docs (Swagger) | https://ai-resume-screener-backend-ok11.onrender.com/docs |

> ⏳ **Note:** The backend runs on Render's free plan and sleeps when idle. The first request may take **30–60 seconds** to wake it up. Please be patient on the first login or signup.
>
> 💡 **Demo tip:** Create a fresh account to try it out. Free-tier storage can reset after restarts.

---

## 📌 About The Project

TalentLens helps job seekers understand how well their resume fits a role. Upload a PDF resume, paste a job description, and instantly get:

- the skills detected in your resume
- a **match percentage** against the job
- the **skills you have** and the **skills you're missing**
- an overall **resume score**
- a dashboard and insights page summarizing your profile

---

## ✨ Features

- ✅ **Secure authentication** with JWT (signup, login, protected routes)
- ✅ **PDF resume upload** with validation (PDF only, 5 MB limit, drag and drop)
- ✅ **Automatic text extraction** from resumes using PyMuPDF
- ✅ **Skill detection** from resume content
- ✅ **Job description matching** with a match percentage
- ✅ **Matched and missing skills** breakdown
- ✅ **Resume scoring** (content score, skill score, sections found)
- ✅ **Dashboard** with latest score, job match and detected skills
- ✅ **Insights page** with strengths, areas to review and quick actions
- ✅ **Settings page** with profile, security and system status
- ✅ **Per-user data**: every user only sees their own resumes
- ✅ **Premium dark UI** with responsive layout, animations and loading states

---

## 🛠️ Tech Stack

### Frontend
- **React** (with **Vite**)
- **React Router** for routing and protected routes
- **Axios** for API calls
- **Lucide React** for icons
- **Tailwind CSS** and custom CSS for styling

### Backend
- **FastAPI** (Python)
- **SQLAlchemy** ORM
- **SQLite** database
- **JWT** authentication (`python-jose`)
- **Passlib + bcrypt** for password hashing
- **PyMuPDF** for PDF text extraction

### Deployment
- **Vercel** for the frontend
- **Render** for the backend
- **GitHub** for version control and auto-deploys

---

## 🏗️ Architecture

```
┌─────────────────────┐        HTTPS         ┌──────────────────────┐
│   React + Vite      │  ─────────────────▶  │      FastAPI         │
│   (Vercel)          │   JWT in header      │      (Render)        │
└─────────────────────┘                      │                      │
                                             │  ┌────────────────┐  │
                                             │  │ PDF Service    │  │
                                             │  │ Skill Analyzer │  │
                                             │  │ Job Matcher    │  │
                                             │  └────────────────┘  │
                                             │          │           │
                                             │     SQLAlchemy       │
                                             │          ▼           │
                                             │       SQLite         │
                                             └──────────────────────┘
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/signup` | Create a new account | ❌ |
| POST | `/login` | Log in and receive a JWT | ❌ |
| GET | `/me` | Get the current user | ✅ |
| POST | `/resume/upload` | Upload a PDF resume and detect skills | ✅ |
| POST | `/resume/match` | Match the resume against a job description | ✅ |
| GET | `/resume/dashboard` | Get score, latest match and skills | ✅ |

Full interactive docs are available at `/docs` (Swagger UI).

---

## 📁 Project Structure

```
AI-Resume-Screener/
├── backend/
│   ├── main.py              # App entry, CORS, auth routes
│   ├── auth.py              # JWT and password hashing
│   ├── crud.py
│   ├── database.py          # SQLAlchemy setup
│   ├── models.py            # User, Resume, JobMatch
│   ├── schemas.py
│   ├── requirements.txt
│   ├── routers/
│   │   └── resume.py        # Upload, match, dashboard
│   └── services/
│       ├── pdf_service.py
│       ├── resume_analyzer.py
│       └── job_matcher.py
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── pages/           # Login, Signup, Dashboard, Upload, Results, Insights, Settings
    │   └── components/      # Navbar, Sidebar, ProtectedRoute, etc.
    └── package.json
```

---

## 📦 Run Locally

### Prerequisites
- Node.js 18+
- Python 3.10+

### 1. Clone the repository

```bash
git clone https://github.com/Nishj0gi/AI-Resume-Screener.git
cd AI-Resume-Screener
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```
SECRET_KEY=your_own_long_random_secret
```

Run the server:

```bash
python -m uvicorn main:app --reload
```

Backend runs at http://127.0.0.1:8000 (docs at http://127.0.0.1:8000/docs).

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173.

To point the frontend at a different backend, create `frontend/.env`:

```
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🔐 Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `SECRET_KEY` | Backend (`.env` / Render) | Signs JWT tokens |
| `VITE_API_URL` | Frontend (Vercel / `.env`) | URL of the backend API |

> 🔒 Never commit `.env` files. They are listed in `.gitignore`.

---

## 🎯 Future Enhancements

- [ ] Migrate from SQLite to **PostgreSQL** for persistent production data
- [ ] Store resumes in **cloud object storage**
- [ ] Support DOCX resumes
- [ ] ML/NLP-based semantic matching (embeddings) instead of keyword matching
- [ ] AI-generated resume improvement suggestions
- [ ] Recruiter view to compare multiple candidates
- [ ] Export analysis report as PDF

---

## 🌟 Key Learnings

This project helped me understand:

- Building a full-stack app with **React and FastAPI**
- **JWT authentication** and protected routes
- Designing REST APIs with **SQLAlchemy** models and schemas
- Parsing PDFs and extracting structured information from text
- Deploying a split frontend and backend (**Vercel + Render**)
- Debugging real deployment issues: environment variables baked in at build time, hard-coded localhost URLs, and **CORS** configuration for production domains

---

## 👩‍💻 Author

**Nishmitha** (Nishj0gi)

- GitHub: [@Nishj0gi](https://github.com/Nishj0gi)
- Live Demo: [TalentLens](https://ai-resume-screener-ten-rho.vercel.app/)

---

## 📄 License

This project is open source and available under the MIT License.

---

⭐ Star this repo if you find it helpful!

Made with ❤️, React and FastAPI
