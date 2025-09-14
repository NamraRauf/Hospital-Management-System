import React, { useState } from 'react';
import { registerPatient } from '../services/api';

const PatientRegister = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    age: '', 
    phone: '', 
    address: '', 
    medicalHistory: '',
    bloodType: '',
    emergencyContact: '',
    insuranceInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 0 || formData.age > 150) {
      newErrors.age = 'Please enter a valid age';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const res = await registerPatient(formData);
      
      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert(`✅ Patient Registration Successful!\n\nWelcome ${res.data.user.name}!\nPatient ID: ${res.data.user.patientId}\n\nYou are now logged in and can access the dashboard.`);
      
      console.log('Patient registration successful:', res.data);
      setFormData({ 
        name: '', 
        email: '', 
        password: '', 
        age: '', 
        phone: '', 
        address: '', 
        medicalHistory: '',
        bloodType: '',
        emergencyContact: '',
        insuranceInfo: ''
      });
      
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Patient registration error:', error);
      if (error.response?.data?.message) {
        alert('❌ Registration Failed: ' + error.response.data.message);
      } else if (error.code === 'ECONNREFUSED') {
        alert('❌ Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        alert('❌ Registration Failed: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#333', marginBottom: '30px', textAlign: 'center' }}>🏥 Patient Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name *" 
              value={formData.name}
              onChange={handleChange} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: errors.name ? '2px solid #ff6b6b' : '1px solid #ddd', 
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
          </div>
          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address *" 
              value={formData.email}
              onChange={handleChange} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: errors.email ? '2px solid #ff6b6b' : '1px solid #ddd', 
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.email}</div>}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Password * (min 6 characters)" 
              value={formData.password}
              onChange={handleChange} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: errors.password ? '2px solid #ff6b6b' : '1px solid #ddd', 
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.password && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.password}</div>}
          </div>
          <div>
            <input 
              type="number" 
              name="age" 
              placeholder="Age *" 
              value={formData.age}
              onChange={handleChange} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: errors.age ? '2px solid #ff6b6b' : '1px solid #ddd', 
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.age && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.age}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number *" 
              value={formData.phone}
              onChange={handleChange} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: errors.phone ? '2px solid #ff6b6b' : '1px solid #ddd', 
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.phone && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.phone}</div>}
          </div>
          <div>
            <select 
              name="bloodType" 
              value={formData.bloodType}
              onChange={handleChange} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: '1px solid #ddd', 
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div>
          <textarea 
            name="address" 
            placeholder="Address *" 
            value={formData.address}
            onChange={handleChange} 
            rows="3"
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: errors.address ? '2px solid #ff6b6b' : '1px solid #ddd', 
              fontSize: '16px', 
              resize: 'vertical',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          {errors.address && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.address}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input 
            type="text" 
            name="emergencyContact" 
            placeholder="Emergency Contact" 
            value={formData.emergencyContact}
            onChange={handleChange} 
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              fontSize: '16px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <input 
            type="text" 
            name="insuranceInfo" 
            placeholder="Insurance Information" 
            value={formData.insuranceInfo}
            onChange={handleChange} 
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #ddd', 
              fontSize: '16px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <textarea 
          name="medicalHistory" 
          placeholder="Medical History (Previous illnesses, allergies, medications)" 
          value={formData.medicalHistory}
          onChange={handleChange} 
          rows="4"
          style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #ddd', 
            fontSize: '16px', 
            resize: 'vertical',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '15px', 
            backgroundColor: loading ? '#6c757d' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '10px',
            transition: 'all 0.3s ease',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(40, 167, 69, 0.3)'
          }}
        >
          {loading ? '⏳ Registering Patient...' : '🏥 Register Patient'}
        </button>
      </form>
    </div>
  );
};

export default PatientRegister;


