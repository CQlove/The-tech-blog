const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'text', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'body', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
                {
                    model: Post,
                    attributes: ['title'],
                },
            ],
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// user sign up
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.loggedIn = true;

            res.json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { name: req.body.name },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: { id: req.params.id },
        });

        if (!userData[0]) {
            res.status(404).json({ message: 'No user found' });
            return;
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: { id: req.params.id },
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found' });
            return;
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;