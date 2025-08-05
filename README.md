# 🏥 Hospital Management System

A full-stack web application for managing hospital operations, including patient registration, doctor appointments, and medical records management.

## 🚀 Features

### Authentication & Authorization
- User registration and login
- Role-based access control (Patient/Doctor)
- JWT token-based authentication
- Secure password hashing with bcrypt

### Patient Features
- Register as a patient
- Book appointments with doctors
- View appointment history
- Access medical records
- Update appointment status

### Doctor Features
- Register as a doctor
- View patient appointments
- Manage appointment schedules
- Update appointment status and notes
- Access patient information

### General Features
- Modern, responsive UI design
- Real-time appointment management
- Secure API endpoints
- MongoDB data persistence

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Modern CSS** - Styling with gradients and animations

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hospital-management-system
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGO_URI=mongodb://localhost:27017/hospital_management_system
JWT_SECRET=your_jwt_secret_key_here_replace_with_secure_key
PORT=5000
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB installation
mongod
```

### 5. Run the Application

Start the backend server:
```bash
cd server
npm run server
```

Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
hospital-management-system/
├── server/                 # Backend application
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Main server file
├── client/                # Frontend application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

## 🔗 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Appointment Routes (Protected)
- `GET /api/appointments/doctors` - Get all doctors
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get user's appointments
- `PUT /api/appointments/:id` - Update appointment status

## 👥 User Roles

### Patient
- Can register and login
- Can book appointments with doctors
- Can view their own appointments
- Can cancel their appointments

### Doctor
- Can register and login as a doctor
- Can view appointments assigned to them
- Can update appointment status and add notes
- Can access patient information for their appointments

## 🔐 Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected API routes with authentication middleware
- Role-based access control
- Input validation and sanitization

## 🎨 UI/UX Features

- Modern gradient background design
- Responsive layout for all devices
- Smooth animations and transitions
- Professional healthcare-themed color scheme
- Intuitive navigation and user experience
- Loading states and error handling

## 🚧 Future Enhancements

- [ ] Medical records management
- [ ] Prescription management
- [ ] Email notifications for appointments
- [ ] Calendar integration
- [ ] Payment processing
- [ ] Admin dashboard
- [ ] Advanced search and filtering
- [ ] File upload for medical documents
- [ ] Real-time chat between patients and doctors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

## 👨‍💻 Author

Hospital Management System - A comprehensive solution for healthcare management.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce the problem

---

**Note**: This is a development version. For production deployment, make sure to:
- Use environment variables for all sensitive data
- Implement proper error handling and logging
- Set up database backups
- Configure HTTPS
- Implement rate limiting and other security measures