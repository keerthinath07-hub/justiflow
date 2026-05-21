# JustiFlow IN - Judicial Optimization Platform

JustiFlow IN is a high-performance, production-quality judicial optimization platform designed to streamline courtroom pendency, automate docket workload balancing, and provide digital case filing and auditing services for Indian High Courts.

This codebase has been rebuilt from a single-file HTML prototype into a modular, production-ready React application leveraging **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **Supabase**.

---

## 📂 Project Architecture

```
project/
├── public/
│   └── favicon.svg                  # Platform Favicon Icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation bar with role CTAs and dark mode toggle
│   │   ├── Hero.jsx                 # Premium landing hero section with visual mockups
│   │   ├── Features.jsx             # Grid detailing court docket features
│   │   ├── Testimonials.jsx         # Reviews grid from retired judges, registrars, and counsel
│   │   ├── FAQ.jsx                  # Interactive accordion questions
│   │   ├── Contact.jsx              # Glassmorphic contact form
│   │   └── Footer.jsx               # Links, copyright, and compliance badges
│   ├── data/
│   │   └── mockData.js              # Seed data for sandbox cases, hearings, and documents
│   ├── pages/
│   │   ├── LandingPage.jsx          # Public landing portal layout
│   │   ├── Login.jsx                # Secure login screen with prefilled demo role credentials
│   │   ├── Dashboard.jsx            # Role-specific workbenches (Admin, Judge, Clerk, Lawyer, Litigant)
│   │   ├── CaseDirectory.jsx        # Case registry query and sorting table
│   │   ├── HearingCalendar.jsx      # Cause list scheduling calendar (rescheduling/details)
│   │   ├── DocumentVault.jsx        # File e-Filing intake with AI Summary NLP simulation
│   │   ├── TransparencyPortal.jsx   # Public caseload and Advocate Performance Index (API)
│   │   ├── NJDGAnalytics.jsx        # National Judicial Data Grid statistical charts
│   │   ├── AdminControls.jsx        # Bench Caseload Optimizer and administrative account lists
│   │   └── SupabaseSetupInstructions.jsx # Supabase SQL migrations and seeding hub
│   ├── utilities/
│   │   ├── supabaseClient.js        # Supabase API client initialization (with sandbox fallback)
│   │   └── dbService.js             # Service layer abstracting Supabase API vs local sandboxes
│   ├── App.jsx                      # App controller managing modals and layouts
│   ├── index.css                    # Tailwind CSS v4 setup and global styles
│   └── main.jsx                     # Application entry point
├── package.json                     # Dependency manifests (React 19, Vite 8, Tailwind v4)
├── vite.config.js                   # Vite dev server configuration with Tailwind plugin
└── README.md                        # Documentation and Setup instructions
```

---

## 🔑 Demo Access Credentials

To test the role-specific workbenches, use the following prefilled logins on the login page (or click any of the prefilled role cards to autofill):

| Role | Username / Email | Password | Role Capability |
|---|---|---|---|
| **System Admin** | `admin@hc.gov.in` | `password` | Run AI Docket Balancing, view administrative metrics |
| **Presiding Judge** | `rsharma@courts.gov.in` | `password` | View active trials, examine case risk priorities, verify orders |
| **Registry Clerk** | `registry@courts.gov.in` | `password` | Verify Vakalatnamas, register cases, dispatch notices |
| **Counsel / Lawyer** | `vikram@lawchambers.in` | `password` | e-File suits, upload affidavits, request adjournments |
| **Citizen / Litigant** | `rahul@email.com` | `password` | Pay filing fee channals, track case progress history |

---

## ⚡ Setup & Installation

### 1. Extract and Install Dependencies
Navigate to the root directory `e:\justice flpw` in your terminal and install dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

---

## 🗄️ Supabase Integration Guide

JustiFlow IN supports a hybrid database architecture. Out-of-the-box, it runs in **Persistent Local Sandbox Mode** using your browser's local storage. This allows you to explore, edit, add, and test cases immediately. 

To switch to a live **Supabase Postgres Database**:

### 1. Create your Supabase Project
Sign up or log in at [https://supabase.com](https://supabase.com) and create a new project.

### 2. Initialize Database Tables
Navigate to the **SQL Editor** in the Supabase Sidebar, open a new query sheet, copy the following SQL schema, and click **Run**:

```sql
-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

-- 2. Create Cases Table
CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  "filingDate" DATE NOT NULL,
  "judgeId" TEXT REFERENCES users(id),
  "lawyerId" TEXT REFERENCES users(id),
  "litigantId" TEXT REFERENCES users(id),
  priority TEXT NOT NULL,
  "predictedDays" INTEGER NOT NULL,
  "riskScore" INTEGER NOT NULL,
  cnr TEXT NOT NULL,
  adjournments INTEGER NOT NULL,
  "ageCategory" TEXT NOT NULL
);

-- 3. Create Hearings Table
CREATE TABLE IF NOT EXISTS hearings (
  id TEXT PRIMARY KEY,
  "caseId" TEXT REFERENCES cases(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL,
  room TEXT NOT NULL,
  type TEXT NOT NULL,
  stage TEXT NOT NULL
);

-- 4. Create Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  "caseId" TEXT REFERENCES cases(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  "uploadedBy" TEXT REFERENCES users(id),
  date DATE NOT NULL,
  status TEXT NOT NULL
);
```

### 3. Add Credentials to `.env`
Create a `.env` file in the root of the project:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-api-key
```

### 4. Seed Demo Cases and Users
Restart the Vite dev server. Open the console, navigate to the **Database Settings** tab on the sidebar, and click the **Seed Live Supabase Database** button. This will automatically populate your Supabase tables with the complete set of demo users, court cases, hearings, and documents!

---

## 🚀 Deployment Instructions

### Build Command
Compile the React application into a production-optimized package:
```bash
npm run build
```
This produces a static distribution in the `/dist` directory.

### Deploy to Vercel
1. Install the Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root directory.
3. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables in Vercel's Project Settings page under Environment Variables.

### Deploy to Netlify
1. Drag and drop the `/dist` folder directly onto the Netlify dashboard, OR:
2. Link your GitHub repository to Netlify and select the build command `npm run build` and output directory `dist`.
3. Add your environment variables in Netlify site settings.

### Deploy to GitHub Pages
1. Install `gh-pages` helper: `npm install gh-pages --save-dev`
2. Add the following scripts to your `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Set your repository URL in `package.json` under `"homepage": "https://username.github.io/repo-name"`.
4. Deploy using: `npm run deploy`
