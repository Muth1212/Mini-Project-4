import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({ user_id: '', password: '', name: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend API for signup (in production, would need API route and database setup)
    console.log("Signup form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
