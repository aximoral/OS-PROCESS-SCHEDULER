@echo off
title OS Scheduler Launcher
echo ==========================================
echo    Starting OS Process Scheduler...
echo ==========================================
echo.
echo The simulation is spinning up. Your browser will open automatically.
echo (Keep this window open to keep the server running. Close it to stop.)
echo.

:: Wait for 3 seconds in the background, then open the browser
start /B cmd /c "ping 127.0.0.1 -n 3 > nul && start http://localhost:5173"

:: Start the Vite server in this window
call npm run dev

pause
