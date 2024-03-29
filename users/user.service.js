﻿const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },{ id: 2, username: 'refi', password: 'password', firstName: 'Rafeeque NT', lastName: 'Refi' }];
const posts=[{title:'create post',description:'you can create your own post',name:'Refi'}]
module.exports = {
    authenticate,
    getAll,postCreate,getPost,register
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function register(user) {
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    
    users.push(user)
    return {
        ...omitPassword(user),
        token
    };
   
  
  
}


async function postCreate(postData) {
    
    posts.push(postData)
   
  
   return 'post created';
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

async function getPost(){


    return posts;
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}