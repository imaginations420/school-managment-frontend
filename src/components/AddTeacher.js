import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/AddTeacher.css';

const AddTeacher = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!name || !subject) {
      setError('All fields are required.');
      return;
    }

    try {
      const userId = JSON.parse(localStorage.getItem('user')).user_id; // Assuming user ID is stored in localStorage
      await axios.post('https://school-managment-backend.onrender.com/teachers',
        { name, subject, user_id: userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/dashboard'); // Redirect after successful addition
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        console.error('Error adding teacher:', error);
        setError('Failed to add teacher.');
      }
    }
  };

  return (
    <div className="add-teacher">
      <h2>Add Teacher</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;
