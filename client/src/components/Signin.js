import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [formData, setFormData] = useState({ user_id: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signin', formData); // Adjust the URL as needed
      const { token, userId } = response.data;

      // Store the token and user ID in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Redirect the user to the home page upon successful signin
      navigate('/');
    } catch (error) {
      console.error("Signin error:", error);
      setError('Invalid user ID or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="User ID"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
