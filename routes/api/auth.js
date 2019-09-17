// Bring in the express router

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const config = require('config');
const { check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

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

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/',
    [
    check('email', 'Email address is not valid').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ errors: [ {msg: 'Invalid credentials'}]});
        }

        // compare is bcrypt method, compares plain text and encrypted password and returns promise

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [ {msg: 'Invalid credentials'} ]})
        }

        //mongoDb uses _id, mongoose just uses id
        const payload = {
            user: {
                id: user.id
            }
        };

        // signing token
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;

                res.json({ token });
            });
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
    // make query with mongoose using findOne()

});

module.exports = router;