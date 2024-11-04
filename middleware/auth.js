const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        const verified = jwt.verify(token, 'your_secret_key'); 
        req.user = verified;

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
