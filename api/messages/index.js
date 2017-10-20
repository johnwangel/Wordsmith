/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
let db = require('../../models');
let Users = db.users;
let Messages = db.messages;
let Topics = db.topics;

//respond with the latest 10 messages including the name of the topic including the author's name
router.get('/latest', getLatestMessages);

//  create and respond with the new message
router.post('/', createNewMessage);

//respond with all messages that belong to the topic by :topic_id including the author's name, including the topic's name, ordered by createdAt ascending
router.get('/by-topic/:topic_id', getMessagesByTopic);

function getLatestMessages(req, res) {
  Messages.findAll({
    order: [['createdAt', 'DESC']],
    limit: 10,
    include: [{ model: Users }, { model: Topics }]
  }).then(tenMessages => {
    res.json(tenMessages);
  });
}

function createNewMessage(req, res) {
  Messages.create({
    body: req.body.body,
    author_id: req.body.author_id,
    topic_id: req.body.topic_id
  })
    .then(message => {
      Messages.findById(message.id, {
        include: [{ model: Users }]
      }).then(myMess => {
        res.json(myMess);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

//get('/by-topic/:topic_id -- respond with all messages that belong to the topic by :topic_id including the author's name, including the topic's name, ordered by createdAt ascending
function getMessagesByTopic(req, res) {
  let topicId = req.params.topic_id;

  Topics.findById(topicId, {
    include: [{ model: Users }, { model: Messages, include: { model: Users } }]
  }).then(allMessages => {
    res.json(allMessages);
  });
}

module.exports = router;
