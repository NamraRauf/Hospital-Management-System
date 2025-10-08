#!/bin/bash

echo "🏥 Hospital Management System Setup Script"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first:"
    echo "   brew install node"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd ../client
npm install

# Create .env file for server
echo "⚙️  Creating server configuration..."
cd ../server
cat > .env << EOF
PORT=6000
MONGO_URI=mongodb://localhost:27017/hospital-management
EOF

echo "✅ Setup complete!"
echo ""
echo "🚀 To start your application:"
echo "   1. Start MongoDB: brew services start mongodb-community"
echo "   2. Start server: cd server && npm run server"
echo "   3. Start client: cd client && npm start"
echo ""
echo "🌐 Your app will be available at:"
echo "   - Backend API: http://localhost:6000"
echo "   - Frontend: http://localhost:3000"
