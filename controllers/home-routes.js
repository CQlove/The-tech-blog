const router = require('express').Router();
const sequelize = require('sequelize');
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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

        const posts = postData.map((post) => post.get({ plain: true }));
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

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'text', 'title', 'created_at'],
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

        if (!postData) {
            res.status(404).json({ message: 'Can not find post!' });
            return;
        }

        const post = postData.get({ plain: true });
        console.log(post);
        res.render('getpostbyid', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/postswithcomments', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'text', 'title', 'created_at'],
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

        if (!postData) {
            res.status(404).json({ message: 'Can not find post!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('postswithcomments', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;