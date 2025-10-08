import React, { useState } from "react";

function App() {
  console.log("App component is rendering!");
  const [currentPage, setCurrentPage] = useState('login'); // Start with login page
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [userType, setUserType] = useState('patient'); // 'patient' or 'doctor'
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Namra Rauf",
    role: "System Developer",
    avatar: "👨‍💻",
    status: "Online",
    lastActive: "now",
    email: "namra@hospital.com",
    specialization: "Full Stack Development",
    department: "IT Department"
  });
  const [allUsers, setAllUsers] = useState([
    { id: 1, name: "Namra Rauf", email: "namra@hospital.com", role: "System Developer", specialization: "Full Stack Development", status: "Active", lastLogin: "now", avatar: "👨‍💻" },
    { id: 2, name: "Dr. Sarah Johnson", email: "sarah@hospital.com", role: "Doctor", specialization: "Cardiology", status: "Active", lastLogin: "2 minutes ago", avatar: "👩‍⚕️" },
    { id: 3, name: "Dr. Michael Brown", email: "michael@hospital.com", role: "Doctor", specialization: "Pediatrics", status: "Active", lastLogin: "1 hour ago", avatar: "👨‍⚕️" },
    { id: 4, name: "John Patient", email: "john@email.com", role: "Patient", specialization: "N/A", status: "Active", lastLogin: "5 minutes ago", avatar: "👤" },
    { id: 5, name: "Jane Smith", email: "jane@email.com", role: "Patient", specialization: "N/A", status: "Inactive", lastLogin: "2 days ago", avatar: "👩" },
    { id: 6, name: "Admin User", email: "admin@hospital.com", role: "Admin", specialization: "System Admin", status: "Active", lastLogin: "30 minutes ago", avatar: "👨‍💼" }
  ]);
  const [showSuperAdmin, setShowSuperAdmin] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resettingUser, setResettingUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Patient',
    specialization: '',
    password: ''
  });
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "09:00 AM", date: "2024-01-15", status: "Confirmed", type: "Checkup", priority: "High" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", time: "10:30 AM", date: "2024-01-15", status: "Confirmed", type: "Follow-up", priority: "Medium" },
    { id: 3, patient: "Bob Wilson", doctor: "Dr. Brown", time: "02:00 PM", date: "2024-01-15", status: "Pending", type: "Consultation", priority: "Low" },
    { id: 4, patient: "Alice Brown", doctor: "Dr. Davis", time: "03:30 PM", date: "2024-01-15", status: "Confirmed", type: "Emergency", priority: "High" }
  ]);
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 45, gender: "Male", phone: "+1-555-0123", email: "john@email.com", address: "123 Main St", medicalHistory: "Diabetes, Hypertension", avatar: "👨", lastVisit: "2 days ago", status: "Active" },
    { id: 2, name: "Jane Smith", age: 32, gender: "Female", phone: "+1-555-0124", email: "jane@email.com", address: "456 Oak Ave", medicalHistory: "Asthma", avatar: "👩", lastVisit: "1 week ago", status: "Active" },
    { id: 3, name: "Bob Wilson", age: 28, gender: "Male", phone: "+1-555-0125", email: "bob@email.com", address: "789 Pine Rd", medicalHistory: "None", avatar: "👨", lastVisit: "3 days ago", status: "Active" },
    { id: 4, name: "Alice Brown", age: 55, gender: "Female", phone: "+1-555-0126", email: "alice@email.com", address: "321 Elm St", medicalHistory: "Arthritis, High Blood Pressure", avatar: "👩", lastVisit: "1 day ago", status: "Active" }
  ]);
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Smith", specialization: "Cardiology", experience: "15 years", phone: "+1-555-0201", email: "smith@hospital.com", schedule: "Mon-Fri 9AM-5PM", avatar: "👨‍⚕️", rating: 4.8, patients: 120 },
    { id: 2, name: "Dr. Johnson", specialization: "General Medicine", experience: "12 years", phone: "+1-555-0202", email: "johnson@hospital.com", schedule: "Mon-Fri 8AM-4PM", avatar: "👩‍⚕️", rating: 4.6, patients: 95 },
    { id: 3, name: "Dr. Brown", specialization: "Pediatrics", experience: "8 years", phone: "+1-555-0203", email: "brown@hospital.com", schedule: "Mon-Fri 10AM-6PM", avatar: "👨‍⚕️", rating: 4.9, patients: 80 },
    { id: 4, name: "Dr. Davis", specialization: "Neurology", experience: "20 years", phone: "+1-555-0204", email: "davis@hospital.com", schedule: "Mon-Fri 9AM-5PM", avatar: "👩‍⚕️", rating: 4.7, patients: 150 }
  ]);
  const [posts, setPosts] = useState([
    { id: 1, author: "Namra Rauf", avatar: "👨‍💻", time: "1 hour ago", content: "Hospital Management System is now live! Excited to see how this will improve patient care and hospital operations. #TechForGood #Healthcare", likes: 28, comments: 12, type: "success" },
    { id: 2, author: "Dr. Sarah Johnson", avatar: "👩‍⚕️", time: "2 hours ago", content: "Just completed a successful heart surgery! The patient is recovering well. #Cardiology #Success", likes: 24, comments: 8, type: "success" },
    { id: 3, author: "Hospital Admin", avatar: "🏥", time: "4 hours ago", content: "New MRI machine installed in Radiology Department. Bookings now available!", likes: 15, comments: 3, type: "announcement" },
    { id: 4, author: "Dr. Michael Brown", avatar: "👨‍⚕️", time: "6 hours ago", content: "Pediatric vaccination drive this weekend. All children under 12 are welcome!", likes: 31, comments: 12, type: "event" },
    { id: 5, author: "Nurse Emma", avatar: "👩‍⚕️", time: "8 hours ago", content: "Thank you to all the amazing staff for their hard work during the emergency cases today! 🙏", likes: 42, comments: 15, type: "appreciation" }
  ]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    doctor: '',
    time: '',
    date: '',
    reason: ''
  });
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    experience: '',
    phone: '',
    email: '',
    schedule: ''
  });
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    medicalHistory: ''
  });

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'Pending'
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({ patient: '', doctor: '', time: '', date: '', reason: '' });
    setShowAppointmentForm(false);
    alert('Appointment booked successfully!');
  };

  const handleInputChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value
    });
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    const doctor = {
      id: doctors.length + 1,
      ...newDoctor
    };
    setDoctors([...doctors, doctor]);
    setNewDoctor({ name: '', specialization: '', experience: '', phone: '', email: '', schedule: '' });
    setShowDoctorForm(false);
    alert('Doctor added successfully!');
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    const patient = {
      id: patients.length + 1,
      ...newPatient
    };
    setPatients([...patients, patient]);
    setNewPatient({ name: '', age: '', gender: '', phone: '', email: '', address: '', medicalHistory: '' });
    setShowPatientForm(false);
    alert('Patient added successfully!');
  };

  const handleDoctorInputChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value
    });
  };

  const handlePatientInputChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value
    });
  };

  // Authentication functions
  const handleLoginWithName = (email, password, name) => {
    // Demo login validation with actual user name
    if (email && password && name) {
      // Determine user type based on email
      let userType = 'patient';
      let role = 'Patient';
      let avatar = '👤';
      let specialization = 'N/A';
      let department = 'Patient Care';
      
      if (email === 'superadmin@hospital.com' && password === 'superadmin123') {
        userType = 'superadmin';
        role = 'Super Admin';
        avatar = '👑';
        specialization = 'System Administration';
        department = 'IT Department';
      } else if (email.includes('admin')) {
        userType = 'admin';
        role = 'Administrator';
        avatar = '👨‍💼';
        specialization = 'Hospital Management';
        department = 'Administration';
      } else if (email.includes('doctor')) {
        userType = 'doctor';
        role = 'Doctor';
        avatar = '👨‍⚕️';
        specialization = 'General Medicine';
        department = 'Medical Department';
      }
      
      setCurrentUser({
        id: Date.now(), // Use timestamp as unique ID
        name: name, // Use the actual name from registration
        role: role,
        avatar: avatar,
        status: "Online",
        lastActive: "now",
        email: email,
        specialization: specialization,
        department: department
      });
      
      setUserType(userType);
      if (userType === 'superadmin') {
        setShowSuperAdmin(true);
      }
      
      // Add new user to the allUsers list
      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        role: role,
        specialization: specialization,
        status: "Active",
        lastLogin: "now",
        avatar: avatar
      };
      setAllUsers(prevUsers => [...prevUsers, newUser]);
      
      setIsAuthenticated(true);
      setCurrentPage('home');
      alert(`Welcome ${name}! You are logged in as ${role}`);
    } else {
      alert('Please enter all required information');
    }
  };

  const handleLogin = (email, password) => {
    // Demo login validation
    if (email && password) {
      // Check if super admin
      if (email === 'superadmin@hospital.com' && password === 'superadmin123') {
        setCurrentUser({
          id: 999,
          name: "Namra Rauf",
          role: "Super Admin",
          avatar: "👑",
          status: "Online",
          lastActive: "now",
          email: "superadmin@hospital.com",
          specialization: "System Administration",
          department: "IT Department"
        });
        setUserType('superadmin');
        setShowSuperAdmin(true);
      } else if (email.includes('admin')) {
        setCurrentUser({
          id: 5,
          name: "Namra Rauf",
          role: "Administrator",
          avatar: "👨‍💼",
          status: "Online",
          lastActive: "1 minute ago",
          email: "admin@hospital.com",
          specialization: "Hospital Management",
          department: "Administration"
        });
        setUserType('admin');
      } else if (email.includes('doctor')) {
        setCurrentUser({
          id: 1,
          name: "Namra Rauf",
          role: "Doctor",
          avatar: "👨‍⚕️",
          status: "Online",
          lastActive: "2 minutes ago",
          email: "doctor@hospital.com",
          specialization: "General Medicine",
          department: "Medical Department"
        });
        setUserType('doctor');
      } else {
        // For new users, extract name from email or use a default
        const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const newUserId = Date.now();
        
        setCurrentUser({
          id: newUserId,
          name: nameFromEmail,
          role: "Patient",
          avatar: "👤",
          status: "Online",
          lastActive: "now",
          email: email,
          specialization: "N/A",
          department: "Patient Care"
        });
        setUserType('patient');
        
        // Add new user to the allUsers list
        const newUser = {
          id: newUserId,
          name: nameFromEmail,
          email: email,
          role: "Patient",
          specialization: "N/A",
          status: "Active",
          lastLogin: "now",
          avatar: "👤"
        };
        setAllUsers(prevUsers => {
          // Check if user already exists
          const userExists = prevUsers.some(user => user.email === email);
          if (!userExists) {
            return [...prevUsers, newUser];
          }
          return prevUsers;
        });
      }
      
      setIsAuthenticated(true);
      setCurrentPage('home');
      alert(`Welcome! You are logged in as ${email}`);
    } else {
      alert('Please enter both email and password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setShowSuperAdmin(false);
    setCurrentUser({
      id: 1,
      name: "Namra Rauf",
      role: "System Developer",
      avatar: "👨‍💻",
      status: "Online",
      lastActive: "now",
      email: "namra@hospital.com",
      specialization: "Full Stack Development",
      department: "IT Department"
    });
  };

  // Super Admin functions
  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: allUsers.length + 1,
      ...newUser,
      status: "Active",
      lastLogin: "Never",
      avatar: newUser.role === 'Doctor' ? '👨‍⚕️' : newUser.role === 'Admin' ? '👨‍💼' : '👤'
    };
    setAllUsers([...allUsers, user]);
    setNewUser({ name: '', email: '', role: 'Patient', specialization: '', password: '' });
    setShowUserForm(false);
    alert('User added successfully!');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      specialization: user.specialization,
      password: ''
    });
    setShowUserForm(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setAllUsers(allUsers.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const handleUserInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  // Password reset functions
  const handlePasswordReset = (user) => {
    console.log('Password reset clicked for user:', user);
    setResettingUser(user);
    setNewPassword('');
    setShowPasswordReset(true);
  };

  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();
    if (newPassword && resettingUser) {
      // Update user password in the allUsers list
      setAllUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === resettingUser.id 
            ? { ...user, password: newPassword, lastPasswordReset: new Date().toLocaleString() }
            : user
        )
      );
      
      alert(`Password successfully reset for ${resettingUser.name}!\nNew password: ${newPassword}`);
      setShowPasswordReset(false);
      setResettingUser(null);
      setNewPassword('');
    } else {
      alert('Please enter a new password');
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case 'login':
  return (
          <div style={{ 
            minHeight: "100vh", 
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "400px"
            }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#1da1f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  margin: "0 auto 20px"
                }}>
                  🏥
                </div>
                <h2 style={{ margin: "0", color: "#1a1a1a", fontSize: "24px" }}>Welcome Back</h2>
                <p style={{ margin: "10px 0 0", color: "#657786", fontSize: "16px" }}>Sign in to your hospital account</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const email = formData.get('email');
                const password = formData.get('password');
                
                handleLogin(email, password);
              }}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: "500" }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email"
                    required
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      border: "1px solid #e1e8ed", 
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      boxSizing: "border-box"
                    }} 
                  />
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: "500" }}>
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Enter your password"
                    required
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      border: "1px solid #e1e8ed", 
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      boxSizing: "border-box"
                    }} 
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ 
                    width: "100%", 
                    padding: "12px 16px", 
                    backgroundColor: "#1da1f2", 
                    color: "white", 
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginBottom: "20px"
                  }}
                >
                  Sign In
                </button>
              </form>

            <div style={{ textAlign: "center" }}>
              <p style={{ margin: "0", color: "#657786", fontSize: "14px" }}>
                Don't have an account? 
                <button 
                  onClick={() => setCurrentPage('register')}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1da1f2",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>


            </div>
          </div>
        );
      case 'register':
        return (
          <div style={{ 
            minHeight: "100vh", 
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "400px"
            }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#17bf63",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  margin: "0 auto 20px"
                }}>
                  🏥
                </div>
                <h2 style={{ margin: "0", color: "#1a1a1a", fontSize: "24px" }}>Create Account</h2>
                <p style={{ margin: "10px 0 0", color: "#657786", fontSize: "16px" }}>Join our hospital management system</p>
              </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const password = formData.get('password');
                    
                    // Demo registration - auto login after registration
                    if (name && email && password) {
                      alert(`Account created successfully!\nName: ${name}\nEmail: ${email}\n\nLogging you in automatically...`);
                      handleLoginWithName(email, password, name);
                    } else {
                      alert('Please fill in all fields');
                    }
                  }}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: "500" }}>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Enter your full name"
                    required
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      border: "1px solid #e1e8ed", 
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      boxSizing: "border-box"
                    }} 
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: "500" }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email"
                    required
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      border: "1px solid #e1e8ed", 
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      boxSizing: "border-box"
                    }} 
                  />
                </div>
                
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#1a1a1a", fontWeight: "500" }}>
                    Password
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Create a password"
                    required
                    style={{ 
                      width: "100%", 
                      padding: "12px 16px", 
                      border: "1px solid #e1e8ed", 
                      borderRadius: "8px",
                      fontSize: "16px",
                      outline: "none",
                      boxSizing: "border-box"
                    }} 
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ 
                    width: "100%", 
                    padding: "12px 16px", 
                    backgroundColor: "#17bf63", 
                    color: "white", 
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginBottom: "20px"
                  }}
                >
                  Create Account
                </button>
              </form>

              <div style={{ textAlign: "center" }}>
                <p style={{ margin: "0", color: "#657786", fontSize: "14px" }}>
                  Already have an account? 
                  <button 
                    onClick={() => setCurrentPage('login')}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1da1f2",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>🏥 Hospital Management Dashboard</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>Manage your hospital operations efficiently</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
              <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f8f9fa", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>👥</div>
                <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Patients</h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>Manage patient records and medical history</p>
                <div style={{ marginBottom: "15px", fontSize: "14px", color: "#28a745" }}>
                  <strong>Total Patients: 156</strong>
                </div>
                <button 
                  onClick={() => setCurrentPage('patients')}
                  style={{ 
                    padding: "12px 20px", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px"
                  }}
                >
                  View Patients
                </button>
              </div>
              
              <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f8f9fa", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>👨‍⚕️</div>
                <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Doctors</h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>Manage doctor profiles and schedules</p>
                <div style={{ marginBottom: "15px", fontSize: "14px", color: "#28a745" }}>
                  <strong>Active Doctors: 24</strong>
                </div>
                <button 
                  onClick={() => setCurrentPage('doctors')}
                  style={{ 
                    padding: "12px 20px", 
                    backgroundColor: "#28a745", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px"
                  }}
                >
                  View Doctors
                </button>
              </div>
              
              <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f8f9fa", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>📅</div>
                <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Appointments</h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>Schedule and manage appointments</p>
                <div style={{ marginBottom: "15px", fontSize: "14px", color: "#ffc107" }}>
                  <strong>Today's Appointments: 12</strong>
                </div>
                <button 
                  onClick={() => setCurrentPage('appointments')}
                  style={{ 
                    padding: "12px 20px", 
                    backgroundColor: "#ffc107", 
                    color: "black", 
                    border: "none", 
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px"
                  }}
                >
                  View Appointments
                </button>
              </div>
              
              <div style={{ padding: "25px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f8f9fa", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>📊</div>
                <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Reports</h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>Generate reports and analytics</p>
                <div style={{ marginBottom: "15px", fontSize: "14px", color: "#6f42c1" }}>
                  <strong>Monthly Reports: 5</strong>
                </div>
                <button 
                  onClick={() => alert("Reports: Generate patient reports, doctor performance, financial reports")}
                  style={{ 
                    padding: "12px 20px", 
                    backgroundColor: "#6f42c1", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "16px"
                  }}
                >
                  View Reports
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div style={{ 
              marginTop: "40px", 
              padding: "20px", 
              backgroundColor: "#e9ecef", 
              borderRadius: "10px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px"
            }}>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "#2c3e50", margin: "0 0 5px 0" }}>156</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Total Patients</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "#2c3e50", margin: "0 0 5px 0" }}>24</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Active Doctors</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "#2c3e50", margin: "0 0 5px 0" }}>12</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>Today's Appointments</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ color: "#2c3e50", margin: "0 0 5px 0" }}>98%</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>System Uptime</p>
              </div>
            </div>
          </div>
        );
      case 'appointments':
        return (
          <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
              📅 Appointment Management
            </h2>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h3 style={{ color: "#2c3e50" }}>Today's Schedule</h3>
              <button 
                onClick={() => setShowAppointmentForm(true)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                + Book New Appointment
              </button>
            </div>

            {/* Appointments List */}
            <div style={{ marginBottom: "30px" }}>
              {appointments.map(appointment => (
                <div key={appointment.id} style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
      <div>
                    <h4 style={{ margin: "0 0 5px 0", color: "#2c3e50" }}>{appointment.patient}</h4>
                    <p style={{ margin: "0 0 5px 0", color: "#666" }}>Doctor: {appointment.doctor}</p>
                    <p style={{ margin: "0", color: "#666" }}>Time: {appointment.time} | Date: {appointment.date}</p>
      </div>
                  <div>
                    <span style={{
                      padding: "5px 15px",
                      borderRadius: "20px",
                      backgroundColor: appointment.status === 'Confirmed' ? '#28a745' : '#ffc107',
                      color: appointment.status === 'Confirmed' ? 'white' : 'black',
                      fontSize: "14px"
                    }}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Book Appointment Form Modal */}
            {showAppointmentForm && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "90%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  overflow: "auto"
                }}>
                  <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>Book New Appointment</h3>
                  
                  <form onSubmit={handleAppointmentSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Patient Name</label>
                      <input
                        type="text"
                        name="patient"
                        value={newAppointment.patient}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Doctor</label>
                      <select
                        name="doctor"
                        value={newAppointment.doctor}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      >
                        <option value="">Select Doctor</option>
                        <option value="Dr. Smith">Dr. Smith - Cardiology</option>
                        <option value="Dr. Johnson">Dr. Johnson - General Medicine</option>
                        <option value="Dr. Brown">Dr. Brown - Pediatrics</option>
                        <option value="Dr. Davis">Dr. Davis - Neurology</option>
                        <option value="Dr. Wilson">Dr. Wilson - Orthopedics</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Date</label>
                      <input
                        type="date"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Time</label>
                      <select
                        name="time"
                        value={newAppointment.time}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      >
                        <option value="">Select Time</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Reason for Visit</label>
                      <textarea
                        name="reason"
                        value={newAppointment.reason}
                        onChange={handleInputChange}
                        rows="3"
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          resize: "vertical"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => setShowAppointmentForm(false)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'patients':
        return (
          <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
              👥 Patient Management System
            </h2>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h3 style={{ color: "#2c3e50" }}>Patient Records</h3>
              <button 
                onClick={() => setShowPatientForm(true)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                + Add New Patient
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {patients.map(patient => (
                <div key={patient.id} style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>{patient.name}</h4>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Age:</strong> {patient.age} | <strong>Gender:</strong> {patient.gender}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Phone:</strong> {patient.phone}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Email:</strong> {patient.email}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Address:</strong> {patient.address}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Medical History:</strong> {patient.medicalHistory}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}>
                      View Details
                    </button>
                    <button style={{
                      padding: "8px 16px",
                      backgroundColor: "#ffc107",
                      color: "black",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Patient Form Modal */}
            {showPatientForm && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "90%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  overflow: "auto"
                }}>
                  <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>Add New Patient</h3>
                  
                  <form onSubmit={handlePatientSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Patient Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newPatient.name}
                        onChange={handlePatientInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Age</label>
                        <input
                          type="number"
                          name="age"
                          value={newPatient.age}
                          onChange={handlePatientInputChange}
                          required
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            fontSize: "16px"
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Gender</label>
                        <select
                          name="gender"
                          value={newPatient.gender}
                          onChange={handlePatientInputChange}
                          required
                          style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            fontSize: "16px"
                          }}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newPatient.phone}
                        onChange={handlePatientInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newPatient.email}
                        onChange={handlePatientInputChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Address</label>
                      <textarea
                        name="address"
                        value={newPatient.address}
                        onChange={handlePatientInputChange}
                        rows="2"
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          resize: "vertical"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Medical History</label>
                      <textarea
                        name="medicalHistory"
                        value={newPatient.medicalHistory}
                        onChange={handlePatientInputChange}
                        rows="3"
                        placeholder="Any known allergies, chronic conditions, etc."
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px",
                          resize: "vertical"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => setShowPatientForm(false)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Add Patient
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'doctors':
        return (
          <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
              👨‍⚕️ Doctor Management System
            </h2>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h3 style={{ color: "#2c3e50" }}>Doctor Profiles</h3>
              <button 
                onClick={() => setShowDoctorForm(true)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                + Add New Doctor
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {doctors.map(doctor => (
                <div key={doctor.id} style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  <h4 style={{ color: "#2c3e50", marginBottom: "15px" }}>{doctor.name}</h4>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Specialization:</strong> {doctor.specialization}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Experience:</strong> {doctor.experience}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Phone:</strong> {doctor.phone}
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>Email:</strong> {doctor.email}
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <strong>Schedule:</strong> {doctor.schedule}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}>
                      View Schedule
                    </button>
                    <button style={{
                      padding: "8px 16px",
                      backgroundColor: "#ffc107",
                      color: "black",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}>
                      Edit Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Doctor Form Modal */}
            {showDoctorForm && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "90%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  overflow: "auto"
                }}>
                  <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>Add New Doctor</h3>
                  
                  <form onSubmit={handleDoctorSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Doctor Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newDoctor.name}
                        onChange={handleDoctorInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Specialization</label>
                      <select
                        name="specialization"
                        value={newDoctor.specialization}
                        onChange={handleDoctorInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      >
                        <option value="">Select Specialization</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="General Medicine">General Medicine</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Psychiatry">Psychiatry</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Experience</label>
                      <input
                        type="text"
                        name="experience"
                        value={newDoctor.experience}
                        onChange={handleDoctorInputChange}
                        placeholder="e.g., 10 years"
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newDoctor.phone}
                        onChange={handleDoctorInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newDoctor.email}
                        onChange={handleDoctorInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Schedule</label>
                      <input
                        type="text"
                        name="schedule"
                        value={newDoctor.schedule}
                        onChange={handleDoctorInputChange}
                        placeholder="e.g., Mon-Fri 9AM-5PM"
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontSize: "16px"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        onClick={() => setShowDoctorForm(false)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Add Doctor
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'superadmin':
        return (
          <div style={{ 
            minHeight: "100vh", 
            backgroundColor: "#f8f9fa",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            {/* Super Admin Header */}
            <div style={{
              backgroundColor: "#2c3e50",
              color: "white",
              padding: "20px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#e74c3c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  border: "3px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}>
                  {currentUser.avatar}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                    <h1 style={{ margin: "0", fontSize: "24px" }}>Super Admin Panel</h1>
                    <div className="online-indicator" style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#1da1f2"
                    }}></div>
                  </div>
                  <p style={{ margin: "0", fontSize: "14px", opacity: "0.8" }}>Welcome, {currentUser.name} • {currentUser.status}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", opacity: "0.7" }}>Complete System Control & User Management</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600"
                }}
              >
                Logout
              </button>
            </div>

            {/* Main Content */}
            <div style={{ padding: "30px" }}>
              {/* Quick Stats */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                gap: "20px",
                marginBottom: "30px"
              }}>
                <div style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>👥</div>
                  <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Total Users</h3>
                  <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#3498db" }}>{allUsers.length}</p>
                </div>
                <div style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>👨‍⚕️</div>
                  <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Doctors</h3>
                  <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#27ae60" }}>{allUsers.filter(u => u.role === 'Doctor').length}</p>
                </div>
                <div style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>👤</div>
                  <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Patients</h3>
                  <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#f39c12" }}>{allUsers.filter(u => u.role === 'Patient').length}</p>
                </div>
                <div style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>👨‍💼</div>
                  <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Admins</h3>
                  <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#9b59b6" }}>{allUsers.filter(u => u.role === 'Admin').length}</p>
                </div>
              </div>

              {/* User Management */}
              <div style={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                overflow: "hidden"
              }}>
                <div style={{
                  backgroundColor: "#34495e",
                  color: "white",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <h2 style={{ margin: "0" }}>User Management</h2>
                  <button 
                    onClick={() => setShowUserForm(true)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                  >
                    + Add New User
                  </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f8f9fa" }}>
                        <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>User</th>
                        <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Role</th>
                        <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Status</th>
                        <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Last Login</th>
                        <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map(user => (
                        <tr key={user.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                          <td style={{ padding: "15px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#e3f2fd",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px"
                              }}>
                                {user.avatar}
                              </div>
                              <div>
                                <p style={{ margin: "0", fontWeight: "600", color: "#2c3e50" }}>{user.name}</p>
                                <p style={{ margin: "0", fontSize: "12px", color: "#7f8c8d" }}>{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "15px" }}>
                            <span style={{
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "600",
                              backgroundColor: user.role === 'Doctor' ? "#e8f5e8" : user.role === 'Admin' ? "#f3e5f5" : "#fff3e0",
                              color: user.role === 'Doctor' ? "#27ae60" : user.role === 'Admin' ? "#9b59b6" : "#f39c12"
                            }}>
                              {user.role}
                            </span>
                            {user.specialization !== 'N/A' && (
                              <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#7f8c8d" }}>{user.specialization}</p>
                            )}
                          </td>
                          <td style={{ padding: "15px" }}>
                            <span style={{
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "600",
                              backgroundColor: user.status === 'Active' ? "#e8f5e8" : "#ffebee",
                              color: user.status === 'Active' ? "#27ae60" : "#e74c3c"
                            }}>
                              {user.status}
                            </span>
                          </td>
                          <td style={{ padding: "15px", color: "#7f8c8d" }}>{user.lastLogin}</td>
                          <td style={{ padding: "15px" }}>
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                              <button 
                                onClick={() => handleEditUser(user)}
                                style={{
                                  padding: "6px 10px",
                                  backgroundColor: "#3498db",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  minWidth: "50px"
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => {
                                  console.log('Reset password button clicked for:', user.name);
                                  handlePasswordReset(user);
                                }}
                                style={{
                                  padding: "6px 10px",
                                  backgroundColor: "#f39c12",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  minWidth: "50px"
                                }}
                              >
                                Reset Password
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                style={{
                                  padding: "6px 10px",
                                  backgroundColor: "#e74c3c",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  minWidth: "50px"
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Add/Edit User Modal */}
            {showUserForm && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "90%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  overflow: "auto"
                }}>
                  <h3 style={{ marginTop: "0", textAlign: "center" }}>
                    {editingUser ? 'Edit User' : 'Add New User'}
                  </h3>
                  <form onSubmit={handleAddUser}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name:</label>
                      <input 
                        type="text" 
                        name="name"
                        value={newUser.name}
                        onChange={handleUserInputChange}
                        required
                        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                      />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
                      <input 
                        type="email" 
                        name="email"
                        value={newUser.email}
                        onChange={handleUserInputChange}
                        required
                        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                      />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Role:</label>
                      <select 
                        name="role"
                        value={newUser.role}
                        onChange={handleUserInputChange}
                        required
                        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                      >
                        <option value="Patient">Patient</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Specialization:</label>
                      <input 
                        type="text" 
                        name="specialization"
                        value={newUser.specialization}
                        onChange={handleUserInputChange}
                        placeholder={newUser.role === 'Patient' ? 'N/A' : 'Enter specialization'}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password:</label>
                      <input 
                        type="password" 
                        name="password"
                        value={newUser.password}
                        onChange={handleUserInputChange}
                        required
                        style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button 
                        type="submit"
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#27ae60",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        {editingUser ? 'Update User' : 'Add User'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setShowUserForm(false);
                          setEditingUser(null);
                          setNewUser({ name: '', email: '', role: 'Patient', specialization: '', password: '' });
                        }}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Password Reset Modal */}
            {showPasswordReset && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
              }}>
                {console.log('Rendering password reset modal for:', resettingUser?.name)}
                <div style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "90%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  overflow: "auto"
                }}>
                  <h3 style={{ marginTop: "0", textAlign: "center", color: "#e74c3c" }}>
                    🔒 Reset Password for {resettingUser?.name}
                  </h3>
                  <p style={{ textAlign: "center", color: "#666", marginBottom: "20px" }}>
                    Enter a new password for this user. They will need to use this password to log in.
                  </p>
                  
                  <form onSubmit={handlePasswordResetSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
                        New Password:
                      </label>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input 
                          type="text" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          required
                          style={{ 
                            flex: 1, 
                            padding: "12px", 
                            border: "1px solid #ddd", 
                            borderRadius: "6px",
                            fontSize: "14px"
                          }}
                        />
                        <button 
                          type="button"
                          onClick={generateRandomPassword}
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#f39c12",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                            whiteSpace: "nowrap"
                          }}
                        >
                          Generate Random
                        </button>
                      </div>
                      <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                        💡 Tip: Use the "Generate Random" button for a secure password
                      </p>
                    </div>

                    <div style={{ 
                      backgroundColor: "#f8f9fa", 
                      padding: "15px", 
                      borderRadius: "6px", 
                      marginBottom: "20px",
                      border: "1px solid #e9ecef"
                    }}>
                      <h4 style={{ margin: "0 0 10px", color: "#495057", fontSize: "14px" }}>Password Requirements:</h4>
                      <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "12px", color: "#6c757d" }}>
                        <li>At least 8 characters long</li>
                        <li>Contains uppercase and lowercase letters</li>
                        <li>Contains numbers and special characters</li>
                        <li>Not easily guessable</li>
                      </ul>
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button 
                        type="submit"
                        style={{
                          padding: "12px 24px",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600"
                        }}
                      >
                        🔄 Reset Password
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setShowPasswordReset(false);
                          setResettingUser(null);
                          setNewPassword('');
                        }}
                        style={{
                          padding: "12px 24px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      default:
        // Show super admin panel if user is super admin
        if (userType === 'superadmin') {
          return (
            <div style={{ 
              minHeight: "100vh", 
              backgroundColor: "#f8f9fa",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            }}>
              {/* Super Admin Header */}
              <div style={{
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "20px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#e74c3c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  border: "3px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}>
                  {currentUser.avatar}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                    <h1 style={{ margin: "0", fontSize: "24px" }}>Super Admin Panel</h1>
                    <div className="online-indicator" style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#1da1f2"
                    }}></div>
                  </div>
                  <p style={{ margin: "0", fontSize: "14px", opacity: "0.8" }}>Welcome, {currentUser.name} • {currentUser.status}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", opacity: "0.7" }}>Complete System Control & User Management</p>
                </div>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  Logout
                </button>
              </div>

              {/* Main Content */}
              <div style={{ padding: "30px" }}>
                {/* Quick Stats */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                  gap: "20px",
                  marginBottom: "30px"
                }}>
                  <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>👥</div>
                    <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Total Users</h3>
                    <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#3498db" }}>{allUsers.length}</p>
                  </div>
                  <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>👨‍⚕️</div>
                    <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Doctors</h3>
                    <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#27ae60" }}>{allUsers.filter(u => u.role === 'Doctor').length}</p>
                  </div>
                  <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>👤</div>
                    <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Patients</h3>
                    <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#f39c12" }}>{allUsers.filter(u => u.role === 'Patient').length}</p>
                  </div>
                  <div style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>👨‍💼</div>
                    <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>Admins</h3>
                    <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#9b59b6" }}>{allUsers.filter(u => u.role === 'Admin').length}</p>
                  </div>
                </div>

                {/* User Management */}
                <div style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden"
                }}>
                  <div style={{
                    backgroundColor: "#34495e",
                    color: "white",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <h2 style={{ margin: "0" }}>User Management</h2>
                    <button 
                      onClick={() => setShowUserForm(true)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#27ae60",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}
                    >
                      + Add New User
                    </button>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                          <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>User</th>
                          <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Role</th>
                          <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Status</th>
                          <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Last Login</th>
                          <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #dee2e6" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map(user => (
                          <tr key={user.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                            <td style={{ padding: "15px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  backgroundColor: "#e3f2fd",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "20px"
                                }}>
                                  {user.avatar}
                                </div>
                                <div>
                                  <p style={{ margin: "0", fontWeight: "600", color: "#2c3e50" }}>{user.name}</p>
                                  <p style={{ margin: "0", fontSize: "12px", color: "#7f8c8d" }}>{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "15px" }}>
                              <span style={{
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                backgroundColor: user.role === 'Doctor' ? "#e8f5e8" : user.role === 'Admin' ? "#f3e5f5" : "#fff3e0",
                                color: user.role === 'Doctor' ? "#27ae60" : user.role === 'Admin' ? "#9b59b6" : "#f39c12"
                              }}>
                                {user.role}
                              </span>
                              {user.specialization !== 'N/A' && (
                                <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#7f8c8d" }}>{user.specialization}</p>
                              )}
                            </td>
                            <td style={{ padding: "15px" }}>
                              <span style={{
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                backgroundColor: user.status === 'Active' ? "#e8f5e8" : "#ffebee",
                                color: user.status === 'Active' ? "#27ae60" : "#e74c3c"
                              }}>
                                {user.status}
                              </span>
                            </td>
                            <td style={{ padding: "15px", color: "#7f8c8d" }}>{user.lastLogin}</td>
                            <td style={{ padding: "15px" }}>
                              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                <button 
                                  onClick={() => handleEditUser(user)}
                                  style={{
                                    padding: "6px 10px",
                                    backgroundColor: "#3498db",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    minWidth: "50px"
                                  }}
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    console.log('Reset password button clicked for:', user.name);
                                    handlePasswordReset(user);
                                  }}
                                  style={{
                                    padding: "6px 10px",
                                    backgroundColor: "#f39c12",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    minWidth: "50px"
                                  }}
                                >
                                  Reset Password
                                </button>
                                <button 
                                  onClick={() => handleDeleteUser(user.id)}
                                  style={{
                                    padding: "6px 10px",
                                    backgroundColor: "#e74c3c",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "11px",
                                    minWidth: "50px"
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Add/Edit User Modal */}
              {showUserForm && (
                <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000
                }}>
                  <div style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "500px",
                    maxHeight: "80vh",
                    overflow: "auto"
                  }}>
                    <h3 style={{ marginTop: "0", textAlign: "center" }}>
                      {editingUser ? 'Edit User' : 'Add New User'}
                    </h3>
                    <form onSubmit={handleAddUser}>
                      <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name:</label>
                        <input 
                          type="text" 
                          name="name"
                          value={newUser.name}
                          onChange={handleUserInputChange}
                          required
                          style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                        />
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
                        <input 
                          type="email" 
                          name="email"
                          value={newUser.email}
                          onChange={handleUserInputChange}
                          required
                          style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                        />
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Role:</label>
                        <select 
                          name="role"
                          value={newUser.role}
                          onChange={handleUserInputChange}
                          required
                          style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                        >
                          <option value="Patient">Patient</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Specialization:</label>
                        <input 
                          type="text" 
                          name="specialization"
                          value={newUser.specialization}
                          onChange={handleUserInputChange}
                          placeholder={newUser.role === 'Patient' ? 'N/A' : 'Enter specialization'}
                          style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                        />
                      </div>
                      <div style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Password:</label>
                        <input 
                          type="password" 
                          name="password"
                          value={newUser.password}
                          onChange={handleUserInputChange}
                          required
                          style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button 
                          type="submit"
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#27ae60",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                          }}
                        >
                          {editingUser ? 'Update User' : 'Add User'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setShowUserForm(false);
                            setEditingUser(null);
                            setNewUser({ name: '', email: '', role: 'Patient', specialization: '', password: '' });
                          }}
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        }
        
        // Regular dashboard for other users
        return (
          <div style={{ 
            display: "flex", 
            minHeight: "100vh", 
            backgroundColor: "#f8f9fa",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}>
            {/* Left Sidebar - Navigation */}
            <div style={{
              width: "280px",
              backgroundColor: "white",
              borderRight: "1px solid #e1e8ed",
              padding: "20px 0",
              position: "fixed",
              height: "100vh",
              overflowY: "auto"
            }}>
                  {/* User Profile */}
                  <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #e1e8ed" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                      <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: currentUser.role === 'Super Admin' ? "#e74c3c" : 
                                        currentUser.role === 'Administrator' ? "#9b59b6" :
                                        currentUser.role === 'Cardiologist' ? "#27ae60" : "#3498db",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        marginRight: "15px",
                        border: "3px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}>
                        {currentUser.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: "0", fontSize: "18px", color: "#1a1a1a", fontWeight: "600" }}>{currentUser.name}</h3>
                        <p style={{ margin: "2px 0", fontSize: "14px", color: "#657786", fontWeight: "500" }}>{currentUser.role}</p>
                        {currentUser.specialization && currentUser.specialization !== 'N/A' && (
                          <p style={{ margin: "2px 0", fontSize: "12px", color: "#8e8e8e" }}>{currentUser.specialization}</p>
                        )}
                        <div style={{ display: "flex", alignItems: "center", marginTop: "6px" }}>
                          <div className="online-indicator" style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "#1da1f2",
                            marginRight: "8px"
                          }}></div>
                          <span style={{ fontSize: "12px", color: "#1da1f2", fontWeight: "500" }}>{currentUser.status}</span>
                          <span style={{ fontSize: "11px", color: "#8e8e8e", marginLeft: "8px" }}>• {currentUser.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Profile Info */}
                    <div style={{ 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px", 
                      padding: "12px",
                      marginTop: "10px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", color: "#657786" }}>Department:</span>
                        <span style={{ fontSize: "12px", color: "#1a1a1a", fontWeight: "500" }}>{currentUser.department}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "12px", color: "#657786" }}>Email:</span>
                        <span style={{ fontSize: "12px", color: "#1a1a1a", fontWeight: "500" }}>{currentUser.email}</span>
                      </div>
                    </div>
                  </div>

              {/* Navigation Menu */}
              <div style={{ padding: "20px 0" }}>
                <div style={{ padding: "0 20px" }}>
                  <h4 style={{ color: "#657786", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", marginBottom: "15px" }}>Main Menu</h4>
                </div>
                
                <div style={{ padding: "8px 0" }}>
                  <button 
                    onClick={() => setCurrentPage('home')}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      border: "none",
                      backgroundColor: "#1da1f2",
                      color: "white",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    🏠 Dashboard
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage('appointments')}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#1a1a1a",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      transition: "background-color 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#f7f9fa"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    📅 Appointments
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage('patients')}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#1a1a1a",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      transition: "background-color 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#f7f9fa"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    👥 Patients
                  </button>
                  
                  <button 
                    onClick={() => setCurrentPage('doctors')}
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#1a1a1a",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      transition: "background-color 0.2s"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#f7f9fa"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    👨‍⚕️ Doctors
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ 
              marginLeft: "280px", 
              flex: 1, 
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Top Header */}
              <div style={{
                backgroundColor: "white",
                borderBottom: "1px solid #e1e8ed",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h1 style={{ margin: "0", fontSize: "24px", color: "#1a1a1a" }}>Hospital Dashboard</h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginRight: "20px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: currentUser.role === 'Super Admin' ? "#e74c3c" : 
                                          currentUser.role === 'Administrator' ? "#9b59b6" :
                                          currentUser.role === 'Cardiologist' ? "#27ae60" : "#3498db",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}>
                          {currentUser.avatar}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <p style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#1a1a1a" }}>{currentUser.name}</p>
                            <div style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#1da1f2"
                            }}></div>
                          </div>
                          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#657786", fontWeight: "500" }}>{currentUser.role}</p>
                          {currentUser.specialization && currentUser.specialization !== 'N/A' && (
                            <p style={{ margin: "1px 0 0", fontSize: "11px", color: "#8e8e8e" }}>{currentUser.specialization}</p>
                          )}
                        </div>
                      </div>
                  <button 
                    onClick={handleLogout}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div style={{ 
                flex: 1, 
                display: "flex", 
                padding: "20px 30px",
                gap: "20px"
              }}>
                {/* Left Column - Stats Cards */}
                <div style={{ flex: "0 0 300px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#1a1a1a" }}>Quick Stats</h3>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid #e1e8ed",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#e3f2fd",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          marginRight: "12px"
                        }}>
                          📅
                        </div>
                        <div>
                          <p style={{ margin: "0", fontSize: "14px", color: "#657786" }}>Today's Appointments</p>
                          <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>12</p>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid #e1e8ed",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#e8f5e8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          marginRight: "12px"
                        }}>
                          👥
                        </div>
                        <div>
                          <p style={{ margin: "0", fontSize: "14px", color: "#657786" }}>Total Patients</p>
                          <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>156</p>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      padding: "20px",
                      border: "1px solid #e1e8ed",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "#fff3e0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          marginRight: "12px"
                        }}>
                          👨‍⚕️
                        </div>
                        <div>
                          <p style={{ margin: "0", fontSize: "14px", color: "#657786" }}>Active Doctors</p>
                          <p style={{ margin: "0", fontSize: "24px", fontWeight: "bold", color: "#1a1a1a" }}>8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Column - Feed */}
                <div style={{ flex: 1, maxWidth: "600px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#1a1a1a" }}>Hospital Feed</h3>
                  </div>

                  {/* Create Post */}
                  <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid #e1e8ed",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    marginBottom: "20px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#e3f2fd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginRight: "12px"
                      }}>
                        {currentUser.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="text" 
                          placeholder="What's happening in the hospital today?"
                          style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                            padding: "8px 0"
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <button style={{ border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>📷</button>
                        <button style={{ border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>📊</button>
                        <button style={{ border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}>😊</button>
                      </div>
                      <button style={{
                        padding: "8px 20px",
                        backgroundColor: "#1da1f2",
                        color: "white",
                        border: "none",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}>
                        Post
                      </button>
                    </div>
                  </div>

                  {/* Posts Feed */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {posts.map(post => (
                      <div key={post.id} style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        padding: "20px",
                        border: "1px solid #e1e8ed",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            marginRight: "12px"
                          }}>
                            {post.avatar}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span style={{ fontWeight: "600", color: "#1a1a1a" }}>{post.author}</span>
                              <span style={{ color: "#657786", fontSize: "14px" }}>·</span>
                              <span style={{ color: "#657786", fontSize: "14px" }}>{post.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ marginBottom: "15px" }}>
                          <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.4", color: "#1a1a1a" }}>
                            {post.content}
                          </p>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "30px", paddingTop: "10px", borderTop: "1px solid #f0f0f0" }}>
                          <button style={{ 
                            border: "none", 
                            background: "none", 
                            cursor: "pointer", 
                            fontSize: "14px", 
                            color: "#657786",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            ❤️ {post.likes}
                          </button>
                          <button style={{ 
                            border: "none", 
                            background: "none", 
                            cursor: "pointer", 
                            fontSize: "14px", 
                            color: "#657786",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            💬 {post.comments}
                          </button>
                          <button style={{ 
                            border: "none", 
                            background: "none", 
                            cursor: "pointer", 
                            fontSize: "14px", 
                            color: "#657786",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            🔄
                          </button>
                          <button style={{ 
                            border: "none", 
                            background: "none", 
                            cursor: "pointer", 
                            fontSize: "14px", 
                            color: "#657786",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            📤
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Quick Actions */}
                <div style={{ flex: "0 0 250px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", color: "#1a1a1a" }}>Quick Actions</h3>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button 
                      onClick={() => setShowAppointmentForm(true)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "#1da1f2",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "left"
                      }}
                    >
                      📅 Book Appointment
                    </button>
                    
                    <button 
                      onClick={() => setShowPatientForm(true)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "#17bf63",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "left"
                      }}
                    >
                      👥 Add Patient
                    </button>
                    
                    <button 
                      onClick={() => setShowDoctorForm(true)}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "#ff6b35",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "left"
                      }}
                    >
                      👨‍⚕️ Add Doctor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  // Authentication check - redirect to login if not authenticated
  if (!isAuthenticated && currentPage !== 'login' && currentPage !== 'register') {
    setCurrentPage('login');
  }

  return (
    <div>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          .online-indicator {
            animation: pulse 2s infinite;
          }
        `}
      </style>
      {renderPage()}
    </div>
  );
}

export default App;
