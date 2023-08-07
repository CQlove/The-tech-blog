const router = require('express').Router();
const sequelize = require('sequelize');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const PostData = await Post.findAll({
            attributes: ['id', 'title', 'text', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = PostData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});



module.exports = router;