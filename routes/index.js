const routes = require('express').Router();
const contactsRouter = require('../routes/contacts');
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.karlaRoute);
routes.get('/chance', lesson1Controller.chanceRoute);
routes.use('/api-docs', require('./swagger'));
routes.use('/contacts', contactsRouter);

module.exports = routes;
