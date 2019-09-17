const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
    // create reference to user model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        reguired: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },

    experience: [
        {
            title: {
                type: String,
                reguired: true
            }, 
            company: {
                type: String,
                reguired: true
            },
            location: {
                type: String,
                reguired: true
            },
            from: {
                type: Date,
                reguired: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            
        }
    ],
    education: [
        {
            school: {
                type: String,
                reguired: true
            }, 
            degree: {
                type: String,
                reguired: true
            },
            fieldofstudy: {
                type: String,
                reguired: true
            },
            from: {
                type: Date,
                reguired: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);