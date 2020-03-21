const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Please enter a password with 6+ characters').isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if (user) {
                res.status(409).json({msg: 'User already exists'});
            }

            user = new User({name, email, password});

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

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
            console.log(error);
        }
    });

module.exports = router;
