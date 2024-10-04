const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');
const contactsRouter = require('../routes/contacts');

routes.get('/', lesson1Controller.karlaRoute);
routes.get('/chance', lesson1Controller.chanceRoute);
routes.use('/contacts', contactsRouter);

module.exports = routes;
