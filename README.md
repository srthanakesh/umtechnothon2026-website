# UMTechnothon 2026

Web application for **UM Technothon 2026**. It includes a React frontend and a Node.js/Express backend, with Supabase for the database.

## Prerequisites

- **Node.js** — latest LTS (e.g. v22)
- **Git**

## Getting Started

### 1. Clone the repository

In a terminal (or File Explorer → right‑click → Open in Terminal):

```sh
git clone https://github.com/PoisonDarterz/technothon-2025.git
cd technothon-2025
```

*(Rename the folder to something like `umtechnothon-2026` locally if you prefer.)*

### 2. Environment variables

Open the project in your editor (e.g. VS Code / Cursor) and ensure you’re in the **project root**.

**Option A — Team .env**  
Create a file named `.env` in the **root** and paste the contents you received.

**Option B — Local development (your own Supabase)**  
1. Copy the example env file:
   - **Windows (PowerShell):** `Copy-Item .env.example .env`
   - Or duplicate `.env.example` and rename the copy to `.env`
2. Edit `.env` and set:
   - **SUPABASE_URL** and **SUPABASE_ANON_KEY** — from [Supabase](https://supabase.com) → your project → Project Settings → API.
   - **JWT_SECRET_KEY** — a long random string (e.g. 32+ characters) for local use.
3. Optional variables can stay commented; defaults are API at `http://localhost:5000` and frontend at `http://localhost:3000`.

## Running the application

### One command (Windows)

From the project root:

```sh
.\start_dev.bat
```

This starts the backend and frontend in two terminal windows and runs `npm install` for both if needed.

### Manual start

- **Backend:**  
  `cd server` → `npm install` → `npm run dev`  
  (API runs at **http://localhost:5000**)

- **Frontend:**  
  `cd client` → `npm install` → `npm run dev` (or `npm start`)  
  (App runs at **http://localhost:3000**)

To stop: close the terminal window(s) for the backend and/or frontend.

## Project structure

| Path       | Description                    |
|-----------|---------------------------------|
| `client/` | React (Vite) frontend           |
| `server/` | Node.js/Express API             |
| `.env`    | Environment variables (root)    |
| `.env.example` | Template for `.env`      |

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database / auth:** Supabase  

---

**UMTechnothon 2026** — University of Malaya Technothon.
