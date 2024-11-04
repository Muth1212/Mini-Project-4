const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); 
const postsRoutes = require('./routes/posts');
app.use('/posts', postsRoutes);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
