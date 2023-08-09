const { User } = require('../models');

const userData = [
    {
        "name": "police",
        "email": "111@gmail.com",
        "password": "123456"
    },
    {
        "name": "techer",
        "email": "222@gmail.com",
        "password": "123456"
    },
    {
        "name": "driver",
        "email": "333@gmail.com",
        "password": "123456"
    }
]


const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;