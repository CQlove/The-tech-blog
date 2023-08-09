const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// ('/api/commnets')
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// ('/api/comments/:id')
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// ('/api/commnets') with POST method
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                body: req.body.body,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.json(commentData);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// ('/api/commnets/:id') with put method to update comment body
// no function added yet
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                body: req.body.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (commentData[0] === 0) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// ('/commnets/:id') with delete method to delete comment 
// no function added yet
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found' });
            return;
        }
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;