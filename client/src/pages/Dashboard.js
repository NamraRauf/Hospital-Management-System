import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Decode JWT token to get user role
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.user.role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const PatientDashboard = () => (
    <div className="dashboard-section">
      <h2>Patient Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>📅 My Appointments</h3>
          <p>View and manage your appointments</p>
          <button>View Appointments</button>
        </div>
        <div className="card">
          <h3>📋 Medical Records</h3>
          <p>Access your medical history</p>
          <button>View Records</button>
        </div>
        <div className="card">
          <h3>🩺 Book Appointment</h3>
          <p>Schedule a new appointment</p>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );

  const DoctorDashboard = () => (
    <div className="dashboard-section">
      <h2>Doctor Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>👥 My Patients</h3>
          <p>Manage your patient list</p>
          <button>View Patients</button>
        </div>
        <div className="card">
          <h3>📅 Today's Appointments</h3>
          <p>View today's scheduled appointments</p>
          <button>View Schedule</button>
        </div>
        <div className="card">
          <h3>📝 Patient Records</h3>
          <p>Update patient medical records</p>
          <button>Manage Records</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Role: {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Loading...'}</p>
      </div>
      
      {userRole === 'patient' && <PatientDashboard />}
      {userRole === 'doctor' && <DoctorDashboard />}
      
      {!userRole && (
        <div className="loading">
          <p>Loading dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;