import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const res = await loginUser(formData);
      
      // Store token and user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      const userType = res.data.user.role === 'doctor' ? 'Doctor' : 'Patient';
      const welcomeMessage = res.data.user.role === 'doctor' 
        ? `Welcome Dr. ${res.data.user.name}!` 
        : `Welcome ${res.data.user.name}! (ID: ${res.data.user.patientId})`;
      
      alert(`✅ Login Successful!\n\n${welcomeMessage}\nUser Type: ${userType}\n\nYou can now access the dashboard!`);
      
      console.log('Login successful:', res.data);
      setFormData({ email: '', password: '' });
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        alert('❌ Login Failed: ' + error.response.data.message);
      } else if (error.code === 'ECONNREFUSED') {
        alert('❌ Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        alert('❌ Login Failed: ' + (error.message || 'Invalid credentials'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '450px', 
      margin: '0 auto', 
      padding: '30px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      color: 'white'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px' }}>
        🔐 User Login
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            placeholder="Password" 
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
          {loading ? '⏳ Logging in...' : '✅ Login'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
        <p>Don't have an account? <a href="/register" style={{ color: '#ffd700', textDecoration: 'none' }}>Register as Doctor</a></p>
        <p>Or <a href="/patient-register" style={{ color: '#ffd700', textDecoration: 'none' }}>Register as Patient</a></p>
      </div>
    </div>
  );
};

export default Login;
