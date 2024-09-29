const express = require('express');
const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = getDb().db('text');
        const contacts = await db.collection('contacts').find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }

    try {
        const db = getDb().db('text');
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.json(contact);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;