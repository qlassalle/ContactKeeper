const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all contacts of the user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all the contacts of the user');
});

// @route   POST api/contacts
// @desc    Add a new contact
// @access  Private
router.post('/', (req, res) => {
    res.send('Create new contact');
});

// @route   PUT api/contacts
// @desc    Edit a contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route   DELETE api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;
