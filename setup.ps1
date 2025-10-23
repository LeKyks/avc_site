# Script d'initialisation du projet Liste de Courses Raclette
# Usage: .\setup.ps1
# Note: Cette application utilise uniquement localStorage (pas de backend)

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
    Write-Host "ERREUR: Dossier frontend introuvable" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Demarrage du serveur de developpement
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "  DEMARRAGE DU SERVEUR" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host ""

Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "   - Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   - Les donnees sont stockees dans localStorage (navigateur)" -ForegroundColor White
Write-Host "   - Appuyez sur CTRL+C dans le terminal pour arreter" -ForegroundColor Yellow
Write-Host ""

# Demarrage frontend
Write-Host "Demarrage du serveur de developpement..." -ForegroundColor Cyan
$frontendPath = Resolve-Path "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'Frontend Vite - localStorage Mode' -ForegroundColor Green; npm run dev"
Start-Sleep -Seconds 2

# Message final
Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  PROJET INITIALISE AVEC SUCCES!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Le serveur de developpement demarre..." -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host "   1. Ouvrez http://localhost:5173 dans votre navigateur" -ForegroundColor White
Write-Host "   2. Vos donnees sont stockees localement dans le navigateur" -ForegroundColor White
Write-Host "   3. Le site est deploye automatiquement sur GitHub Pages" -ForegroundColor White
Write-Host ""
Write-Host "Commandes utiles:" -ForegroundColor Cyan
Write-Host "   - Dev server:  cd frontend && npm run dev" -ForegroundColor White
Write-Host "   - Build prod:  cd frontend && npm run build" -ForegroundColor White
Write-Host "   - Deploy:      git push origin main" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
