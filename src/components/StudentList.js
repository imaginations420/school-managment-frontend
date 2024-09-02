import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://school-managment-backend.onrender.com/students', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStudents(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch students.');
        }
      }
    };

    fetchStudents();
  }, [navigate]);

  const handleRemoveStudent = async (studentId) => {
    try {
      await axios.delete(`https://school-managment-backend.onrender.com/students/${studentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStudents(students.filter(student => student.student_id !== studentId));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        setError('Failed to remove student.');
      }
    }
  };

  return (
    <div className="student-list">
      <h1>Student List</h1>
      {error && <div className="error">{error}</div>}
      <button onClick={() => navigate('/add-student')}>Add Student</button>
      <ul>
        {students.map(student => (
          <li key={student.student_id}>
            {student.name} - {student.grade}
            <button onClick={() => handleRemoveStudent(student.student_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
