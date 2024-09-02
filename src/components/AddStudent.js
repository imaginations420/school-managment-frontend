import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/AddStudent.css';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!name || !grade) {
      setError('All fields are required.');
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('user')); // Retrieve user data
      if (!userData || !userData.user_id) {
        throw new Error('User ID not found');
      }
      const userId = userData.user_id;

      await axios.post('https://school-managment-backend.onrender.com/students',
        { name, grade, user_id: userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/dashboard'); // Redirect after successful addition
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        console.error('Error adding student:', error);
        setError(error.message || 'Failed to add student.');
      }
    }
  };

  return (
    <div className="add-student">
      <h2>Add Student</h2>
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
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
