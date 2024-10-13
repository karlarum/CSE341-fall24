const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).send('Internal Server Error');
  }
};
const getSingle = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const db = mongodb.getDb().db();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

const createContact = async (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  try {
    const db = mongodb.getDb().db();
    const result = await db.collection('contacts').insertOne(newContact);
    const createdContact = await db.collection('contacts').findOne({ _id: result.insertedId });
    res.status(201).json(createdContact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const db = mongodb.getDb().db();
    const result = await db.collection('contacts').replaceOne({ _id: new ObjectId(id) }, updatedContact);

    if (result.matchedCount === 0) {
      return res.status(404).send('Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format');
  }

  try {
    const db = mongodb.getDb().db();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send('Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getContacts,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
