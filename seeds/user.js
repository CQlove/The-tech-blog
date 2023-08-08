const { User } = require('../models');

const userData = [
    {
        "name": "police",
        "password": "123456"
    },
    {
        "name": "techer",
        "password": "123456"
    },
    {
        "name": "driver",
        "password": "123456"
    }
]


const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;