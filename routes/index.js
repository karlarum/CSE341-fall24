// const routes = require('express').Router();
// const contactsRouter = require('../routes/contacts');
// routes.use('/api-docs', require('./swagger'));
// routes.use('/contacts', contactsRouter);

// module.exports = routes;

const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

module.exports = router;