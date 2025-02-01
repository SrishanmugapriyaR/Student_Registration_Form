import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import CSS

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    gender: '',
  });
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData);
      setMessage(response.data.message);
      fetchStudents();  // Refresh the student list after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        gender: '',
      });
    } catch (err) {
      setMessage('Error registering student');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students');
      setStudents(response.data);
    } catch (err) {
      setMessage('Error fetching students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Student Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <h2>Registered Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.email} - {student.course} - {student.gender}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

