const seedComment = require('./comment');
const seedUser = require('./user');
const seedPost = require('./user');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};

seedAll();