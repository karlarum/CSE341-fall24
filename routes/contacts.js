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

router.post('/', async (req, res) => {
  const newContact = req.body;

  try {
    const db = getDb().db('text');
    const result = await db.collection('contacts').insertOne(newContact);
    const createdContact = await db.collection('contacts').findOne({ _id: result.insertedId });
    res.status(201).json(createdContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedContact = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const db = getDb().db('text');
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send('Contact not found');
    }
    res.json({ message: 'Contact updated successfully' });
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const db = getDb().db('text');
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send('Contact not found');
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;