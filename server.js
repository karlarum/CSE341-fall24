const express = require('express');
const { initDb, getDb } = require('./db/connect');
const app = express();

const port = 3000;

initDb((err, db) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        console.error(err.message);
        process.exit(1);
    }

    console.log('MongoDB connected successfully.');

    app.use('/', require('./routes'));

    app.listen(process.env.PORT || port, () => {
        console.log('Web Server is listening at port ' + (process.env.PORT || port));
    });
});