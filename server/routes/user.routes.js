const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller');
const app = express()
//read a json file
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/user', user.createUser) //create new user
router.get('/user', user.readAllUsers) //get all users
router.get('/user/:id', user.readUser) //get one user
router.get('/userJoin', user.joinTable) //show join table
router.put('/user/:id', user.updateUser) //update user
//router.delete('/user/:id', user.deleteUser) //delete user
router.delete('/user/:id', user.deleteRows) //delete user



module.exports = router