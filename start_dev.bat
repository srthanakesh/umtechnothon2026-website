@echo off
REM Start Backend
echo Starting backend...
start "Backend" pwsh -NoExit -Command "cd server; npm install; npm run dev"
timeout /t 5 /nobreak >nul

REM Start Frontend
echo Starting frontend...
start "Frontend" pwsh -NoExit -Command "cd client; npm install; npm start"
timeout /t 5 /nobreak >nul