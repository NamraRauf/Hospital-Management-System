import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import PatientRegister from "./pages/PatientRegister";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#f8f9fa",
        fontFamily: "Arial, sans-serif"
      }}>
        {/* Header */}
        <header style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          color: "white", 
          padding: "20px 0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <h1 style={{ margin: 0, fontSize: "2.5rem", fontWeight: "bold" }}>
              🏥 Hospital Management System
            </h1>
            <p style={{ margin: "10px 0 0 0", fontSize: "1.2rem", opacity: 0.9 }}>
              Complete Healthcare Management Solution
            </p>
          </div>
        </header>

        {/* Navigation */}
        <nav style={{ 
          background: "white", 
          padding: "15px 0", 
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <Link to="/" style={{ marginRight: "30px", textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "1.1rem" }}>🏠 Home</Link>
            <Link to="/register" style={{ marginRight: "30px", textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "1.1rem" }}>👨‍⚕️ Doctor Registration</Link>
            <Link to="/patient-register" style={{ marginRight: "30px", textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "1.1rem" }}>🏥 Patient Registration</Link>
            <Link to="/login" style={{ marginRight: "30px", textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "1.1rem" }}>🔐 Login</Link>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "#333", fontWeight: "bold", fontSize: "1.1rem" }}>📊 Dashboard</Link>
          </div>
        </nav>
        
        {/* Main Content */}
        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Routes>
            <Route path="/" element={
              <div>
                <div style={{ 
                  background: "white", 
                  padding: "40px", 
                  borderRadius: "15px", 
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  marginBottom: "30px"
                }}>
                  <h2 style={{ color: "#333", marginBottom: "20px" }}>Welcome to Our Hospital Management System</h2>
                  <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#666" }}>
                    Streamline your healthcare operations with our comprehensive management solution. 
                    Manage doctors, patients, appointments, and medical records all in one place.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                  <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>👨‍⚕️</div>
                    <h3 style={{ color: "#333", marginBottom: "15px" }}>Doctor Management</h3>
                    <p style={{ color: "#666", marginBottom: "20px" }}>
                      Register and manage doctor profiles, specializations, and schedules
                    </p>
                    <Link to="/register" style={{ background: "#007bff", color: "white", padding: "12px 25px", textDecoration: "none", borderRadius: "25px", display: "inline-block", fontWeight: "bold" }}>Register Doctor</Link>
                  </div>

                  <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🏥</div>
                    <h3 style={{ color: "#333", marginBottom: "15px" }}>Patient Management</h3>
                    <p style={{ color: "#666", marginBottom: "20px" }}>
                      Track patient records, medical history, and treatment plans
                    </p>
                    <Link to="/patient-register" style={{ background: "#28a745", color: "white", padding: "12px 25px", textDecoration: "none", borderRadius: "25px", display: "inline-block", fontWeight: "bold" }}>Register Patient</Link>
                  </div>

                  <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>📊</div>
                    <h3 style={{ color: "#333", marginBottom: "15px" }}>Analytics & Reports</h3>
                    <p style={{ color: "#666", marginBottom: "20px" }}>
                      Generate reports and analyze hospital performance metrics
                    </p>
                    <Link to="/dashboard" style={{ background: "#ffc107", color: "#333", padding: "12px 25px", textDecoration: "none", borderRadius: "25px", display: "inline-block", fontWeight: "bold" }}>View Dashboard</Link>
                  </div>
                </div>

                <div style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", marginTop: "30px" }}>
                  <h3 style={{ color: "#333", marginBottom: "20px" }}>System Features</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                    <div style={{ padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
                      <strong>🆔 Patient ID Management</strong><br/>
                      <span style={{ color: "#666" }}>Unique patient identification system</span>
                    </div>
                    <div style={{ padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
                      <strong>👨‍⚕️ Doctor Profiles</strong><br/>
                      <span style={{ color: "#666" }}>Complete doctor information management</span>
                    </div>
                    <div style={{ padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
                      <strong>📅 Appointment Scheduling</strong><br/>
                      <span style={{ color: "#666" }}>Easy appointment booking system</span>
                    </div>
                    <div style={{ padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
                      <strong>📋 Medical Records</strong><br/>
                      <span style={{ color: "#666" }}>Digital medical record keeping</span>
                    </div>
                  </div>
                </div>
              </div>
            } />
          <Route path="/register" element={<Register />} />
            <Route path="/patient-register" element={<PatientRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </main>

        {/* Footer */}
        <footer style={{ background: "#333", color: "white", padding: "30px 0", marginTop: "50px", textAlign: "center" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <p>&copy; 2024 Hospital Management System. All rights reserved.</p>
            <p style={{ opacity: 0.7, marginTop: "10px" }}>
              Built with React & Node.js | MongoDB Database
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

export default App;


export default App;

