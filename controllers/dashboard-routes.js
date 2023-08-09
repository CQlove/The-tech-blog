const router = require('express').Router();
const sequelize = require('sequelize');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
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
        res.render('dashboard', { posts, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'text', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('editpost', { post, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;