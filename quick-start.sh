#!/bin/bash

# WeatherPro SaaS Quick Start Script
# This script automates the initial setup process

set -e

echo "🚀 WeatherPro SaaS Quick Start Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    
    print_success "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing all dependencies..."
    
    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    print_success "All dependencies installed successfully"
}

# Setup environment files
setup_env_files() {
    print_status "Setting up environment files..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        if [ -f "backend/env.example" ]; then
            cp backend/env.example backend/.env
            print_success "Backend .env file created from template"
        else
            print_warning "Backend env.example not found, creating basic .env"
            cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/weatherpro_db
REDIS_URL=redis://localhost:6379
OPENWEATHER_API_KEY=your_openweather_api_key_here
EOF
        fi
    else
        print_warning "Backend .env file already exists"
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env" ]; then
        if [ -f "frontend/env.example" ]; then
            cp frontend/env.example frontend/.env
            print_success "Frontend .env file created from template"
        else
            print_warning "Frontend env.example not found, creating basic .env"
            cat > frontend/.env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=WeatherPro
VITE_DEV_MODE=true
EOF
        fi
    else
        print_warning "Frontend .env file already exists"
    fi
}

# Initialize Git repository
init_git() {
    print_status "Initializing Git repository..."
    
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "🎉 Initial commit: WeatherPro SaaS with React + Node.js + Leaflet"
        print_success "Git repository initialized with initial commit"
    else
        print_warning "Git repository already exists"
    fi
}

# Build the project
build_project() {
    print_status "Building the project..."
    
    cd frontend
    npm run build
    cd ..
    
    print_success "Project built successfully"
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎯 Setup Complete! Next Steps:"
    echo "=============================="
    echo ""
    echo "1. Start development servers:"
    echo "   npm run dev"
    echo ""
    echo "2. Access the application:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5000"
    echo ""
    echo "3. Update environment variables:"
    echo "   - Edit backend/.env with your API keys"
    echo "   - Edit frontend/.env if needed"
    echo ""
    echo "4. For Railway deployment:"
    echo "   - Install Railway CLI: npm install -g @railway/cli"
    echo "   - Run: railway login && railway link"
    echo ""
    echo "5. For production:"
    echo "   - Set NODE_ENV=production in backend/.env"
    echo "   - Configure your database and Redis URLs"
    echo ""
    echo "📚 Documentation: README.md"
    echo "🔧 Setup Guide: SETUP_COMMANDS.md"
    echo ""
}

# Main execution
main() {
    echo "Starting WeatherPro SaaS setup..."
    echo ""
    
    check_node
    check_npm
    install_dependencies
    setup_env_files
    init_git
    build_project
    show_next_steps
    
    print_success "WeatherPro SaaS setup completed successfully! 🎉"
}

# Run main function
main "$@"
