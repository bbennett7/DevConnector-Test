// Bring in the express router

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult} = require('express-validator/check');
const User = require('../../models/User');



// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    // validation to make sure name is there
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email address is not valid').isEmail(),
    check('password', 'Password must be 6 characters or more').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(user) {
            res.status(400).json({ errors: [ {msg: 'User already exists'}]});
        }
        // Get user's gravatar

        const avatar = gravatar.url(email, {
            // size
            s: '200',
            // rating
            r: 'pg',
            // degault image
            default: 'mm'
        })

        // create instance of user but does not save
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Encrypt password using bcrypt, pass in 10 rounds
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Return jsonwebtoken bc in the frontend, when user registers we want them to be logged in right away

        res.send('User registered')
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
    // make query with mongoose using findOne()

});

module.exports = router;