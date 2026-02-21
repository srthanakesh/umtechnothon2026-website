# UMTechnothon 2026

Web application for **UM Technothon 2026**. It includes a React frontend and a Node.js/Express backend, with Supabase for the database.

## Prerequisites

- **Node.js** — latest LTS (e.g. v22)
- **Git**

## Getting Started

### 1. Clone the repository

In a terminal (or File Explorer → right‑click → Open in Terminal):

```sh
git clone https://github.com/srthanakesh/umtechnothon2026-website.git
cd umtechnothon2026-website
```

*(Rename the folder to something like `umtechnothon-2026` locally if you prefer.)*

### 2. Environment variables

Open the project in your editor (e.g. VS Code / Cursor) and ensure you’re in the **project root**.

**Use the team’s shared .env**  
Get the `.env` contents and create a file named `.env` in the **root** of the repo and paste the contents. Everyone uses the same Supabase project and keys — do not create your own Supabase project.
* Copy `.env.example` to `.env` and fill in the values (SUPABASE_URL, SUPABASE_ANON_KEY, JWT_SECRET_KEY).

## Repo rules

- **Do not push directly to `main`.** Always use a branch.
- **Create a branch first** for your work, then push the branch and open a Pull Request (PR) to merge into `main`.
- Example: `git checkout -b feature/your-feature-name` or `git checkout -b fix/description`, then push and create a PR on GitHub.
- Keep `main` stable; merge only after review or team approval.

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
