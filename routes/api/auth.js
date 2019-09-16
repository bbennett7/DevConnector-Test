// Bring in the express router

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// creates route -> get request to '/', callback with request and response 
// @route   GET api/auth
// @desc    Test route
// @access  Public
// adding auth as argument protects route 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;