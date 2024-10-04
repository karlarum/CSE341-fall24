const express = require('express');
const bodyParser = require('body-parser');
const { initDb } = require('./db/connect');
const contactsRouter = require('./routes/contacts');

const app = express();
const port = 3000;

app.use(bodyParser.json());

initDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }

    console.log('MongoDB connected successfully.');

    app.use('/contacts', contactsRouter);

    app.listen(process.env.PORT || port, () => {
        console.log('Web Server is listening at port ' + (process.env.PORT || port));
    });
});