/*jshint esversion:6 */
const passport = require('passport');
const express = require('express');
const bcrypt = require('bcrypt');
let db = require('../../models');
let Users = db.users;
let Messages = db.messages;
let Topics = db.topics;
require('../../passport')();

const router = express.Router();
const saltRounds = 10;

//respond with all users
router.get('/', getAllUsers);

//  respond with user and all messages author'd by this user
router.get('/:id', getUsersMesssages);

//create and respond with new user
router.post('/', createNewUser);

//create and respond with new user
router.post('/login', loginUser);

//get/
function getAllUsers(req, res) {
  Users.findAll().then(function(allUsers) {
    res.json(allUsers);
  });
}

//get/id respond with user and all messages author'd by this user
function getUsersMesssages(req, res) {
  let id = req.params.id;
  Users.findOne({
    where: { id: id },
    include: [{ model: Messages, include: { model: Topics } }]
  })
    .then(usersMessages => {
      res.json(usersMessages);
    })
    .catch(err => {
      res.send(err);
    });
}

//post/
function createNewUser(req, res) {
  console.log('getting here');
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      Users.create({
        name: req.body.username,
        password: hash
      })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        return res.json(err);
      });
    });
  });
}

function loginUser(req, res) {
  passport.authenticate('local',
    (err, user) => {
      if (err) return res.status(500).json({ err });
      if (!user) return res.status(401).json({ message: 'invalid' });

      req.logIn(user, error => {
        if (err) return res.json({ error });
        console.log("USERNAME", user.dataValues)
        return res.status(200).json(user.dataValues);
      });
  })(req, res);
}

module.exports = router;
