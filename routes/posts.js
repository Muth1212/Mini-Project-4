const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 
const auth = require('../middleware/auth'); 

router.put('/:id', auth, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,    
            { new: true } 
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
