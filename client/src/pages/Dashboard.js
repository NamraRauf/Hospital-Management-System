import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🏥 Hospital Management Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>👥 Patients</h3>
          <p>Manage patient records and appointments</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            View Patients
          </button>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>👨‍⚕️ Doctors</h3>
          <p>Manage doctor profiles and schedules</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            View Doctors
          </button>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>📅 Appointments</h3>
          <p>Schedule and manage appointments</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            View Appointments
          </button>
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h3>📊 Reports</h3>
          <p>Generate reports and analytics</p>
          <button style={{ padding: '10px 20px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
