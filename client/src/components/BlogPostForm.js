import React, { useState } from 'react';
import axios from 'axios';

function BlogPostForm({ onPostCreated }) {
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/posts', formData);
      onPostCreated(response.data);
      setFormData({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default BlogPostForm;
