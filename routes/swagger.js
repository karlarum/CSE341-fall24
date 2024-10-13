const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
// router.use('/api-docs', swaggerUi.serve); // uncomment if it doesn't work
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
