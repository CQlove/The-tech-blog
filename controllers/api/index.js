const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRouter = require('./comment-routes');
const postRouter = require('./user-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRouter);
router.use('/posts', postRouter);

module.exports = router;