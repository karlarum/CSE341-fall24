const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.karlaRoute);
routes.get('/chance', lesson1Controller.chanceRoute);

module.exports = routes;