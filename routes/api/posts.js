// Bring in the express router

const express = require('express');
const router = express.Router();

// creates route -> get request to '/', callback with request and response 
// @route   GET api/posts
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;