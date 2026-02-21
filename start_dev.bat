@echo off
REM Start Backend
echo Starting backend...
start "Backend" powershell -NoExit -Command "cd server; npm install; npm run dev"
timeout /t 5 /nobreak >nul

REM Start Frontend
echo Starting frontend...
start "Frontend" powershell -NoExit -Command "cd client; npm install; npm start"
timeout /t 5 /nobreak >nul