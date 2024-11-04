import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import BlogPostForm from './components/BlogPostForm';
import PostList from './components/PostList';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div>
        <h1>Blog Application</h1>
        
        {/* Navigation Links */}
        <nav>
          <Link to="/signup">Sign Up</Link> | 
          <Link to="/signin">Sign In</Link> | 
          <Link to="/">Home</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route 
            path="/" 
            element={
              <div>
                <BlogPostForm />
                <PostList />
              </div>
            } 
          />
          <Route path="/edit/:id" element={<EditPost />} /> {/* Edit Post Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
