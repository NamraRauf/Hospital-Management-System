import React, { useState, useEffect } from 'react';
import { getDoctors, getPatients, getAppointments, createAppointment, deleteAppointment } from '../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    fee: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setBackendStatus('checking');
      const [doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
        getDoctors(),
        getPatients(),
        getAppointments()
      ]);
      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
      setAppointments(appointmentsRes.data);
      setBackendStatus('connected');
    } catch (error) {
      console.error('Error loading data:', error);
      setBackendStatus('disconnected');
      if (error.code === 'ECONNREFUSED') {
        alert('⚠️ Backend server is not running!\n\nPlease start the backend server:\n1. Open terminal\n2. cd server\n3. npm run server\n\nThen refresh this page.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await createAppointment(appointmentForm);
      alert('✅ Appointment Created Successfully!\n\nPatient: ' + appointmentForm.patientName + '\nDoctor: ' + appointmentForm.doctorName + '\nDate: ' + appointmentForm.appointmentDate + '\nTime: ' + appointmentForm.appointmentTime);
      setShowAppointmentForm(false);
      setAppointmentForm({
        patientName: '',
        doctorName: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        fee: ''
      });
      loadData();
    } catch (error) {
      console.error('Appointment creation error:', error);
      if (error.code === 'ECONNREFUSED') {
        alert('❌ Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        alert('❌ Error creating appointment: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('🗑️ Are you sure you want to delete this appointment?')) {
      try {
        await deleteAppointment(id);
        alert('✅ Appointment deleted successfully!');
        loadData();
      } catch (error) {
        console.error('Delete appointment error:', error);
        if (error.code === 'ECONNREFUSED') {
          alert('❌ Cannot connect to server. Please make sure the backend is running on port 5000.');
        } else {
          alert('❌ Error deleting appointment: ' + (error.response?.data?.message || error.message));
        }
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>🏥 Hospital Management Dashboard</h1>
        <div style={{ 
          padding: '8px 16px', 
          borderRadius: '20px', 
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: backendStatus === 'connected' ? '#d4edda' : backendStatus === 'disconnected' ? '#f8d7da' : '#fff3cd',
          color: backendStatus === 'connected' ? '#155724' : backendStatus === 'disconnected' ? '#721c24' : '#856404',
          border: `1px solid ${backendStatus === 'connected' ? '#c3e6cb' : backendStatus === 'disconnected' ? '#f5c6cb' : '#ffeaa7'}`
        }}>
          {backendStatus === 'connected' ? '🟢 Backend Connected' : 
           backendStatus === 'disconnected' ? '🔴 Backend Disconnected' : 
           '🟡 Checking Connection...'}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{ 
            padding: '12px 25px', 
            marginRight: '10px', 
            backgroundColor: activeTab === 'overview' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'overview' ? 'white' : '#333',
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📊 Overview
        </button>
        <button 
          onClick={() => setActiveTab('patients')}
          style={{ 
            padding: '12px 25px', 
            marginRight: '10px', 
            backgroundColor: activeTab === 'patients' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'patients' ? 'white' : '#333',
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🏥 Patients ({patients.length})
        </button>
        <button 
          onClick={() => setActiveTab('doctors')}
          style={{ 
            padding: '12px 25px', 
            marginRight: '10px', 
            backgroundColor: activeTab === 'doctors' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'doctors' ? 'white' : '#333',
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          👨‍⚕️ Doctors ({doctors.length})
        </button>
        <button 
          onClick={() => setActiveTab('appointments')}
          style={{ 
            padding: '12px 25px', 
            marginRight: '10px', 
            backgroundColor: activeTab === 'appointments' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'appointments' ? 'white' : '#333',
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📅 Appointments ({appointments.length})
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3 style={{ color: '#007bff', fontSize: '2rem', margin: '0 0 10px 0' }}>{patients.length}</h3>
              <p style={{ margin: 0, color: '#666' }}>Total Patients</p>
            </div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3 style={{ color: '#28a745', fontSize: '2rem', margin: '0 0 10px 0' }}>{doctors.length}</h3>
              <p style={{ margin: 0, color: '#666' }}>Active Doctors</p>
            </div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3 style={{ color: '#ffc107', fontSize: '2rem', margin: '0 0 10px 0' }}>{appointments.length}</h3>
              <p style={{ margin: 0, color: '#666' }}>Total Appointments</p>
            </div>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3 style={{ color: '#dc3545', fontSize: '2rem', margin: '0 0 10px 0' }}>{appointments.filter(apt => apt.status === 'scheduled').length}</h3>
              <p style={{ margin: 0, color: '#666' }}>Scheduled Appointments</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#333', marginBottom: '20px' }}>📅 Recent Appointments</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                  <strong>9:00 AM</strong> - John Smith with Dr. Johnson
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                  <strong>10:30 AM</strong> - Sarah Wilson with Dr. Brown
                </div>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                  <strong>2:00 PM</strong> - Mike Davis with Dr. Lee
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#333', marginBottom: '20px' }}>🚨 Emergency Alerts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '10px', background: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
                  <strong>High Priority:</strong> Patient P004 - Critical Condition
                </div>
                <div style={{ padding: '10px', background: '#f8d7da', borderRadius: '5px', border: '1px solid #f5c6cb' }}>
                  <strong>Urgent:</strong> Blood Bank - Low O+ Supply
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === 'patients' && (
        <div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>🏥 Patient Records</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                          <tr style={{ background: '#f8f9fa' }}>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Patient ID</th>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Name</th>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Age</th>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Blood Type</th>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Phone</th>
                            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Actions</th>
                          </tr>
                        </thead>
                                        <tbody>
                          {patients.map(patient => (
                            <tr key={patient._id}>
                              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>{patient.patientId || patient._id.slice(-6)}</strong></td>
                              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{patient.name}</td>
                              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{patient.age || 'N/A'}</td>
                              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{patient.bloodType || 'N/A'}</td>
                              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{patient.phone || 'N/A'}</td>
                              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                                <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                                  View
                                </button>
                                <button style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>👨‍⚕️ Doctor Profiles</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Doctor ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doctor => (
                    <tr key={doctor._id}>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>{doctor._id.slice(-6)}</strong></td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{doctor.name}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{doctor.email}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                          View
                        </button>
                        <button style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
        <div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#333', margin: 0 }}>📅 Appointments</h3>
              <button 
                onClick={() => setShowAppointmentForm(true)}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                + New Appointment
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Patient</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Doctor</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Time</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Reason</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment._id}>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{appointment.patientName}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{appointment.doctorName}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{appointment.appointmentTime}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{appointment.reason}</td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          fontSize: '12px',
                          backgroundColor: appointment.status === 'scheduled' ? '#d4edda' : appointment.status === 'completed' ? '#cce5ff' : '#f8d7da',
                          color: appointment.status === 'scheduled' ? '#155724' : appointment.status === 'completed' ? '#004085' : '#721c24'
                        }}>
                          {appointment.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                        <button style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteAppointment(appointment._id)}
                          style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointment Form Modal */}
          {showAppointmentForm && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.5)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '10px', 
                width: '500px',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}>
                <h3 style={{ marginBottom: '20px' }}>Create New Appointment</h3>
                <form onSubmit={handleCreateAppointment}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Patient Name:</label>
                    <input 
                      type="text" 
                      value={appointmentForm.patientName}
                      onChange={(e) => setAppointmentForm({...appointmentForm, patientName: e.target.value})}
                      required
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Doctor Name:</label>
                    <input 
                      type="text" 
                      value={appointmentForm.doctorName}
                      onChange={(e) => setAppointmentForm({...appointmentForm, doctorName: e.target.value})}
                      required
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date:</label>
                    <input 
                      type="date" 
                      value={appointmentForm.appointmentDate}
                      onChange={(e) => setAppointmentForm({...appointmentForm, appointmentDate: e.target.value})}
                      required
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Time:</label>
                    <input 
                      type="time" 
                      value={appointmentForm.appointmentTime}
                      onChange={(e) => setAppointmentForm({...appointmentForm, appointmentTime: e.target.value})}
                      required
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Reason:</label>
                    <input 
                      type="text" 
                      value={appointmentForm.reason}
                      onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                      required
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fee:</label>
                    <input 
                      type="number" 
                      value={appointmentForm.fee}
                      onChange={(e) => setAppointmentForm({...appointmentForm, fee: e.target.value})}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      type="submit"
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      Create Appointment
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAppointmentForm(false)}
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        flex: 1
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
      )}
    </div>
  );
};

export default Dashboard;
