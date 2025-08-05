import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'patient' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await registerUser(formData);
      alert('Registration Successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <select 
              name="role" 
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
