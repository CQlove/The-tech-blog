const { Post } = require('../models');

const postData = [
    {
        title: "Guess my job",
        text: "My job needs to work at anytime when citizen need me",
        user_id: 1
    },
    {
        title: "Guess my mother's job",
        text: "My mom's job will have a lot of students",
        user_id: 2
    },
    {
        title: "Guess my father's job",
        text: "My father's job needs to use car to send people to destination",
        user_id: 3
    }
]


const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;