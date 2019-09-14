// Bring in the express router

const express = require('express');
const router = express.Router();

// creates route -> get request to '/', callback with request and response 
// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

module.exports = router;