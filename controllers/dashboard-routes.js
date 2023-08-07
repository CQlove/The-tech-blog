const router = require('express').Router();
const sequelize = require('sequelize');
const { Post, User, Comment } = require('../models');
const WithAuth = require('../utils/auth')



module.exports = router;