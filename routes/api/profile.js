// Bring in the express router

const express = require('express');
const router = express.Router();

// creates route -> get request to '/', callback with request and response 
// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;