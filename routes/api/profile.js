// Bring in the express router
const express = require('express');
const router = express.Router();

// need to bring in auth middleware because routes are private, getting profile using user id in token
const auth = require('../../middleware/auth');
// add auth as second parameter to any routes we want to protect

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// creates route -> get request to '/', callback with request and response 
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;