const { getDb } = require('../db/connect');

const karlaRoute = (req, res) => {
    res.send("Karla Rummler");
};

const chanceRoute = (req, res) => {
    res.send("Chance Rummler");
};

const getContacts = async (req, res) => {
    try {
        const db = getDb().db("text");
        const contacts = await db.collection('contacts').find().toArray();
        res.json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    karlaRoute,
    chanceRoute,
    getContacts
};