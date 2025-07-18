import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed');

      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required autoComplete="name" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required autoComplete="email" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required autoComplete="new-password" />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
