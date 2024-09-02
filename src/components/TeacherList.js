import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/TeacherList.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://school-managment-backend.onrender.com/teachers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTeachers(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch teachers.');
        }
      }
    };

    fetchTeachers();
  }, [navigate]);

  const handleRemoveTeacher = async (teacherId) => {
    try {
      await axios.delete(`https://school-managment-backend.onrender.com/teachers/${teacherId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTeachers(teachers.filter(teacher => teacher.teacher_id !== teacherId));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        setError('Failed to remove teacher.');
      }
    }
  };

  return (
    <div className="teacher-list">
      <h1>Teacher List</h1>
      {error && <div className="error">{error}</div>}
      <button onClick={() => navigate('/add-teacher')}>Add Teacher</button>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.teacher_id}>
            {teacher.name} - {teacher.subject}
            <button onClick={() => handleRemoveTeacher(teacher.teacher_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
