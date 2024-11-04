// src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams(); // Extract post ID from URL
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const [error, setError] = useState('');

  // Fetch the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT is stored in localStorage
          },
        });
        setPost({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load the post. You might not have permission to edit this post.');
      }
    };

    fetchPost();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // After successful update, navigate back to home
      navigate('/');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update the post. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label><br />
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            rows="10"
            cols="50"
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
