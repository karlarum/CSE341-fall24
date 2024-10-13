const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Contacts'
    },
    host: 'https://cse341-fall24-2sba.onrender.com/',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js']; //change back to index if it doesn't work

swaggerAutogen(outputFile, endpointsFiles, doc);
