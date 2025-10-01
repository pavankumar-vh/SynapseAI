# Restart App Script
# Run this to completely reset and restart both servers

Write-Host "🔄 RESTARTING AI CONTENT TOOLKIT" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clear Vite cache
Write-Host "1️⃣ Clearing Vite cache..." -ForegroundColor Yellow
$viteCachePath = "client\node_modules\.vite"
if (Test-Path $viteCachePath) {
    Remove-Item -Path $viteCachePath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✅ Vite cache cleared" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ No Vite cache found (this is OK)" -ForegroundColor Gray
}
Write-Host ""

# Step 2: Check .env files
Write-Host "2️⃣ Checking configuration files..." -ForegroundColor Yellow

if (Test-Path "client\.env") {
    Write-Host "   ✅ Frontend .env exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ Frontend .env MISSING!" -ForegroundColor Red
}

if (Test-Path "server\.env") {
    Write-Host "   ✅ Backend .env exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ Backend .env MISSING!" -ForegroundColor Red
}
Write-Host ""

# Step 3: Instructions
Write-Host "3️⃣ Now follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   📌 TERMINAL 1 (Backend):" -ForegroundColor Cyan
Write-Host "      cd server" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   📌 TERMINAL 2 (Frontend):" -ForegroundColor Cyan
Write-Host "      cd client" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   📌 BROWSER:" -ForegroundColor Cyan
Write-Host "      1. Press Ctrl+Shift+N (Incognito)" -ForegroundColor White
Write-Host "      2. Go to: http://localhost:5173" -ForegroundColor White
Write-Host "      3. Press F12 (Open DevTools)" -ForegroundColor White
Write-Host "      4. Check Console tab for logs" -ForegroundColor White
Write-Host ""

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "✅ Ready to restart!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 TIP: Use Incognito mode to avoid cache issues!" -ForegroundColor Yellow
Write-Host ""

