const routes = require('express').Router();
const contactsRouter = require('../routes/contacts');
routes.use('/api-docs', require('./swagger'));
routes.use('/contacts', contactsRouter);

module.exports = routes;
