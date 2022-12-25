const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register',registerUser)

router.get('/', getAll);
router.post('/create',createPost)
router.get('/posts',getPosts)

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}
function createPost(req, res, next) {
    userService.postCreate(req.body)
        .then(user => res.json(user))
        .catch(next);
}
function registerUser(req, res, next) {
    userService.register(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}
function getPosts(req, res, next) {
    userService.getPost()
        .then(users => res.json(users))
        .catch(next);
}
