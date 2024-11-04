// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  // Function to delete a post
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  // Function to navigate to edit post
  const editPost = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By {post.author} at {new Date(post.time).toLocaleString()}</p>
          {/* Conditionally render Edit button if the current user is the author */}
          {localStorage.getItem('userId') === post.authorId && ( // Assuming you store userId in localStorage
            <button onClick={() => editPost(post.id)}>Edit</button>
          )}
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
