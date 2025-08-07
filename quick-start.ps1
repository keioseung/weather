# WeatherPro SaaS Quick Start Script (PowerShell)
# This script automates the initial setup process for Windows

param(
    [switch]$SkipGit,
    [switch]$SkipBuild
)

# Error handling
$ErrorActionPreference = "Stop"

Write-Host "🚀 WeatherPro SaaS Quick Start Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Node.js is installed
function Test-NodeInstallation {
    Write-Status "Checking Node.js installation..."
    
    try {
        $nodeVersion = node --version
        $nodeMajor = [int]($nodeVersion -replace 'v', '' -split '\.')[0]
        
        if ($nodeMajor -lt 18) {
            Write-Error "Node.js version 18+ is required. Current version: $nodeVersion"
            exit 1
        }
        
        Write-Success "Node.js $nodeVersion is installed"
    }
    catch {
        Write-Error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    }
}

# Check if npm is installed
function Test-NpmInstallation {
    Write-Status "Checking npm installation..."
    
    try {
        $npmVersion = npm --version
        Write-Success "npm $npmVersion is installed"
    }
    catch {
        Write-Error "npm is not installed."
        exit 1
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Status "Installing all dependencies..."
    
    # Install root dependencies
    Write-Status "Installing root dependencies..."
    npm install
    
    # Install frontend dependencies
    Write-Status "Installing frontend dependencies..."
    Set-Location frontend
    npm install
    Set-Location ..
    
    # Install backend dependencies
    Write-Status "Installing backend dependencies..."
    Set-Location backend
    npm install
    Set-Location ..
    
    Write-Success "All dependencies installed successfully"
}

# Setup environment files
function Setup-EnvironmentFiles {
    Write-Status "Setting up environment files..."
    
    # Backend environment
    if (-not (Test-Path "backend\.env")) {
        if (Test-Path "backend\env.example") {
            Copy-Item "backend\env.example" "backend\.env"
            Write-Success "Backend .env file created from template"
        }
        else {
            Write-Warning "Backend env.example not found, creating basic .env"
            @"
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/weatherpro_db
REDIS_URL=redis://localhost:6379
OPENWEATHER_API_KEY=your_openweather_api_key_here
"@ | Out-File -FilePath "backend\.env" -Encoding UTF8
        }
    }
    else {
        Write-Warning "Backend .env file already exists"
    }
    
    # Frontend environment
    if (-not (Test-Path "frontend\.env")) {
        if (Test-Path "frontend\env.example") {
            Copy-Item "frontend\env.example" "frontend\.env"
            Write-Success "Frontend .env file created from template"
        }
        else {
            Write-Warning "Frontend env.example not found, creating basic .env"
            @"
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=WeatherPro
VITE_DEV_MODE=true
"@ | Out-File -FilePath "frontend\.env" -Encoding UTF8
        }
    }
    else {
        Write-Warning "Frontend .env file already exists"
    }
}

# Initialize Git repository
function Initialize-GitRepository {
    if ($SkipGit) {
        Write-Warning "Skipping Git initialization"
        return
    }
    
    Write-Status "Initializing Git repository..."
    
    if (-not (Test-Path ".git")) {
        git init
        git add .
        git commit -m "🎉 Initial commit: WeatherPro SaaS with React + Node.js + Leaflet"
        Write-Success "Git repository initialized with initial commit"
    }
    else {
        Write-Warning "Git repository already exists"
    }
}

# Build the project
function Build-Project {
    if ($SkipBuild) {
        Write-Warning "Skipping project build"
        return
    }
    
    Write-Status "Building the project..."
    
    Set-Location frontend
    npm run build
    Set-Location ..
    
    Write-Success "Project built successfully"
}

# Display next steps
function Show-NextSteps {
    Write-Host ""
    Write-Host "🎯 Setup Complete! Next Steps:" -ForegroundColor Cyan
    Write-Host "==============================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Start development servers:" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Access the application:" -ForegroundColor White
    Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Gray
    Write-Host "   Backend API: http://localhost:5000" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Update environment variables:" -ForegroundColor White
    Write-Host "   - Edit backend\.env with your API keys" -ForegroundColor Gray
    Write-Host "   - Edit frontend\.env if needed" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. For Railway deployment:" -ForegroundColor White
    Write-Host "   - Install Railway CLI: npm install -g @railway/cli" -ForegroundColor Gray
    Write-Host "   - Run: railway login && railway link" -ForegroundColor Gray
    Write-Host ""
    Write-Host "5. For production:" -ForegroundColor White
    Write-Host "   - Set NODE_ENV=production in backend\.env" -ForegroundColor Gray
    Write-Host "   - Configure your database and Redis URLs" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📚 Documentation: README.md" -ForegroundColor Gray
    Write-Host "🔧 Setup Guide: SETUP_COMMANDS.md" -ForegroundColor Gray
    Write-Host ""
}

# Main execution
function Main {
    Write-Host "Starting WeatherPro SaaS setup..." -ForegroundColor Cyan
    Write-Host ""
    
    Test-NodeInstallation
    Test-NpmInstallation
    Install-Dependencies
    Setup-EnvironmentFiles
    Initialize-GitRepository
    Build-Project
    Show-NextSteps
    
    Write-Success "WeatherPro SaaS setup completed successfully! 🎉"
}

# Run main function
Main
