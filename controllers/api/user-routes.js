const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// user sign up
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.logged_in = true;

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
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


// update user, function not added yet
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

// delete use and no function added for now
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