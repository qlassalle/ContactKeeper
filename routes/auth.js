const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check')
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
    res.send('Get logged in user');
});

// @route   POST api/auth 
// @desc    Auth user & get token
// @access  Public
router.post('/', [
        check('email', 'Please provide an email').isEmail(),
        check('password', 'Please provide a password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({msg: 'No user with this email'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({msg: 'Invalid password'});
            }

            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 36000
            }, (error, token) => {
                if (error) {
                    throw error;
                }
                res.send({token});
            });
        } catch (error) {
            console.log("Unable to log in user");
        }
    });

module.exports = router;
