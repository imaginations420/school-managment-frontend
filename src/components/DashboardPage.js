import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DashboardPage.css';



const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome</h1>
      <button onClick={() => navigate('/students')}>Manage Students</button>
      <button onClick={() => navigate('/teachers')}>Manage Teachers</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
