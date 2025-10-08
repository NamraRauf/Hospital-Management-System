import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: '#2c3e50',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
          🏥 Hospital Management System
        </h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ color: 'white', fontWeight: 'bold' }}>Dr. Dashboard</span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '30px' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '30px', textAlign: 'center' }}>
          Doctor Management Dashboard
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          {/* Patient Management Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#3498db',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                👥
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Patient Management</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              View and manage patient records, medical history, and treatment plans
            </p>
            <button style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%'
            }}>
              View Patients
            </button>
          </div>

          {/* Appointment Management Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#e67e22',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                📅
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Appointments</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Manage your schedule, view upcoming appointments, and patient consultations
            </p>
            <button style={{
              backgroundColor: '#e67e22',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%'
            }}>
              View Appointments
            </button>
          </div>

          {/* Medical Records Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#27ae60',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                📋
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Medical Records</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Access and update patient medical records, prescriptions, and treatment notes
            </p>
            <button style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%'
            }}>
              View Records
            </button>
          </div>

          {/* Analytics Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#9b59b6',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '15px'
              }}>
                📊
              </div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Analytics & Reports</h3>
            </div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Generate reports and analyze hospital performance metrics
            </p>
            <button style={{
              backgroundColor: '#9b59b6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%'
            }}>
              View Analytics
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '20px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Today's Overview</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>8</h4>
              <p style={{ margin: 0, color: '#666' }}>Appointments Today</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>12</h4>
              <p style={{ margin: 0, color: '#666' }}>Patients Seen</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>3</h4>
              <p style={{ margin: 0, color: '#666' }}>Pending Reviews</p>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>95%</h4>
              <p style={{ margin: 0, color: '#666' }}>Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px'
      }}>
        <p style={{ margin: 0 }}>© 2024 Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DoctorDashboard;
