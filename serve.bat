@echo off
echo ====================================
echo Vivah Villa Collection Website
echo ====================================
echo.
echo Starting local development server...
echo Website will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ====================================
echo.

:: Try different server options
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Using Node.js server...
    npx serve . -p 8000 -s
) else (
    echo Node.js not found. Trying Python server...
    where python >nul 2>nul
    if %ERRORLEVEL% == 0 (
        echo Using Python server...
        python -m http.server 8000
    ) else (
        echo No server available. Please install Node.js or Python.
        echo Alternatively, open index.html directly in your browser.
        pause
        exit /b 1
    )
)

echo.
echo Server stopped.
pause
