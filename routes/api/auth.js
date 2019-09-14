// Bring in the express router

const express = require('express');
const router = express.Router();

// creates route -> get request to '/', callback with request and response 
// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;