const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator/check')

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all contacts of the user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// @route   POST api/contacts
// @desc    Add a new contact
// @access  Private
router.post('/', [auth, [
        check('name', 'Please provide a name').not().isEmpty()
    ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({msg: errors});
        }
        const {name, email, phone, type} = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            return res.status(500).json(error);
        }
});

// @route   PUT api/contacts
// @desc    Edit a contact
// @access  Private
router.put('/:id', auth, async(req, res) => {
    const {name, email, phone, type} = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({msg: 'This contact doesn\'t exist'});
        }
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "You don't own this contact"});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, {
            $set: contactFields,

        }, {new: true});

        res.json(contact);
    } catch (e) {
        return res.json(e);
    }
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async(req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({msg: 'This contact doesn\'t exist'});
        }
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "You don't own this contact"});
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json(contact);
    } catch (e) {
        return res.json(e);
    }

});

module.exports = router;
