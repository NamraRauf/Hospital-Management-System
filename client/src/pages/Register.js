import React, { useState } from 'react';
import { registerDoctor } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    specialization: 'General Medicine',
    phone: '',
    address: ''
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
      const res = await registerDoctor(formData);
      
      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert(`✅ Doctor Registration Successful!\n\nWelcome Dr. ${res.data.user.name}!\nSpecialization: ${res.data.user.specialization}\n\nYou are now logged in and can access the dashboard.`);
      
      console.log('Registration successful:', res.data);
      setFormData({ name: '', email: '', password: '', specialization: 'General Medicine', phone: '', address: '' });
      
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
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
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '30px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      color: 'white'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>
        👨‍⚕️ Doctor Registration
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={handleChange} 
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: errors.name ? '2px solid #ff6b6b' : '2px solid #ddd',
              width: '100%',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.name && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
        </div>
        
        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange} 
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: errors.email ? '2px solid #ff6b6b' : '2px solid #ddd',
              width: '100%',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.email}</div>}
        </div>
        
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password (min 6 characters)" 
            value={formData.password}
            onChange={handleChange} 
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: errors.password ? '2px solid #ff6b6b' : '2px solid #ddd',
              width: '100%',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          {errors.password && <div style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '5px' }}>{errors.password}</div>}
        </div>
        
        <div>
          <select 
            name="specialization" 
            value={formData.specialization}
            onChange={handleChange}
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #ddd',
              width: '100%',
              fontSize: '16px',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
          >
            <option value="General Medicine">General Medicine</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Gynecology">Gynecology</option>
          </select>
        </div>
        
        <div>
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number (optional)" 
            value={formData.phone}
            onChange={handleChange} 
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #ddd',
              width: '100%',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div>
          <textarea 
            name="address" 
            placeholder="Address (optional)" 
            value={formData.address}
            onChange={handleChange} 
            rows="3"
            style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #ddd',
              width: '100%',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>
        
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
            transition: 'all 0.3s ease',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(40, 167, 69, 0.3)'
          }}
        >
          {loading ? '⏳ Registering...' : '✅ Register as Doctor'}
        </button>
    </form>
    </div>
  );
};

export default Register;
