// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleGoToBugs = () => {
    navigate('/bugs');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // or clear user info
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <p>You are logged in ✅</p>

      <button onClick={handleGoToBugs} style={buttonStyle}>🐛 View Bug Tracker</button>
      <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: '#d9534f' }}>🚪 Logout</button>
    </div>
  );
};

const buttonStyle = {
  margin: '10px 0',
  padding: '10px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#ffc107',
  border: 'none',
  borderRadius: '4px',
  color: '#000',
};

export default Dashboard;