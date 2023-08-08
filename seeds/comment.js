const { Comment } = require('../models');

const commentData = [
    {
        body: "I am a police officer",
        user_id: 1,
        post_id: 1
    },
    {
        body: "I am a teacher",
        user_id: 2,
        post_id: 2
    },
    {
        body: "I am an Uber driver",
        user_id: 3,
        post_id: 3
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;