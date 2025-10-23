# Script d'initialisation du projet Liste de Courses Raclette
# Usage: .\setup.ps1

Write-Host ""
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "  SETUP - LISTE DE COURSES RACLETTE" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host ""

# Verification de Node.js
Write-Host "Verification des prerequis..." -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERREUR: Node.js n'est pas installe!" -ForegroundColor Red
    Write-Host "Telechargez-le depuis: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node --version
Write-Host "Node.js trouve: $nodeVersion" -ForegroundColor Green

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "ERREUR: npm n'est pas installe!" -ForegroundColor Red
    exit 1
}

$npmVersion = npm --version
Write-Host "npm trouve: v$npmVersion" -ForegroundColor Green
Write-Host ""

# Installation Backend
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "  INSTALLATION BACKEND" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host ""

if (Test-Path "backend") {
    Set-Location backend
    
    Write-Host "Installation des dependances backend..." -ForegroundColor Cyan
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backend installe avec succes!" -ForegroundColor Green
    } else {
        Write-Host "ERREUR lors de l'installation du backend" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    Set-Location ..
} else {
    Write-Host "ATTENTION: Dossier backend introuvable" -ForegroundColor Yellow
}

Write-Host ""

# Installation Frontend
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "  INSTALLATION FRONTEND" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host ""

if (Test-Path "frontend") {
    Set-Location frontend
    
    Write-Host "Installation des dependances frontend..." -ForegroundColor Cyan
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Frontend installe avec succes!" -ForegroundColor Green
    } else {
        Write-Host "ERREUR lors de l'installation du frontend" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    Set-Location ..
} else {
    Write-Host "ATTENTION: Dossier frontend introuvable" -ForegroundColor Yellow
}

Write-Host ""

# Demarrage des serveurs
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "  DEMARRAGE DES SERVEURS" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host ""

Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "   - Backend: http://localhost:3000" -ForegroundColor White
Write-Host "   - Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   - Appuyez sur CTRL+C dans chaque terminal pour arreter" -ForegroundColor Yellow
Write-Host ""

# Demarrage backend
if (Test-Path "backend") {
    Write-Host "Demarrage du backend dans un nouveau terminal..." -ForegroundColor Cyan
    $backendPath = Resolve-Path "backend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host 'Backend API' -ForegroundColor Green; npm start"
    Start-Sleep -Seconds 2
}

# Demarrage frontend
if (Test-Path "frontend") {
    Write-Host "Demarrage du frontend dans un nouveau terminal..." -ForegroundColor Cyan
    $frontendPath = Resolve-Path "frontend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Vite' -ForegroundColor Green; npm run dev"
    Start-Sleep -Seconds 2
}

# Message final
Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  PROJET INITIALISE AVEC SUCCES!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Le projet est pret!" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host "   1. Le backend demarre sur http://localhost:3000" -ForegroundColor White
Write-Host "   2. Le frontend demarre sur http://localhost:5173" -ForegroundColor White
Write-Host "   3. Ouvrez http://localhost:5173 dans votre navigateur" -ForegroundColor White
Write-Host ""
Write-Host "Commandes utiles:" -ForegroundColor Cyan
Write-Host "   - Backend dev:  cd backend && npm run dev" -ForegroundColor White
Write-Host "   - Frontend build:  cd frontend && npm run build" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
