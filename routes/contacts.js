const express = require('express');
const { getContacts, getSingle, createContact, updateContact, deleteContact } = require('../controllers/contacts')
const router = express.Router();

router
    .route('/')
    .get(getContacts)
    .post(createContact);

router
    .route('/:id')
    .get(getSingle)
    .put(updateContact)
    .delete(deleteContact);

module.exports = router;
