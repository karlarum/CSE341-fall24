const karlaRoute = (req, res) => {
    res.send("Karla Rummler");
};

const chanceRoute = (req, res) => {
    res.send("Chance Rummler");
};

module.exports = {
    karlaRoute,
    chanceRoute
};