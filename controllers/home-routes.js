const router = require('express').Router();
const sequelize = require('sequelize');
const { Post, User, Comment } = require('../models');


// this is the main page and u will see all the post no matter you logged in or not
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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            mseeage: 'homepage-route faile',
            err
        });
    }
});

// go to log in page
router.get('/login', (req, res) => {
    // if logged in
    if (req.session.logged_in) {
        // redirect to main(or root), which is homepage
        res.redirect('/');
        return;
    }
    res.render('login');
});

// go to sign up and render signup.handlebars
router.get('/signup', (req, res) => {
    res.render('signup');
});

// get post by post id
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
        res.render('getpostbyid', { post, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;