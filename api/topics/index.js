/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
let db = require('../../models');
let Users = db.users;
let Messages = db.messages;
let Topics = db.topics;

//  respond with all topics including the creator's name
router.get('/', getAllTopics);

//create and respond with a new topic
router.post('/', createNewTopic);

//update and respond with the updated topic
router.put('/:name', updateTopic);

//get //  respond with all topics including the creator's name
function getAllTopics(req, res) {
  debugger;
  Topics.findAll({ include: { model: Users } }).then(allTopics => {
    res.json(allTopics);
  });
}

function createNewTopic(req, res) {
  let created_by = req.body.created_by;
  let name = req.body.name;
  console.log('creating topic with ', created_by, ' and ', name);

  Topics.findOne({ where: { name: name } })
    .then(topic => {
      if (topic) {
        res.json(topic);
        return;
      }
      Topics.create({ name: name, created_by: created_by }).then(topic => {
        res.json(topic);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function updateTopic(req, res) {
  let name = req.body.name;
  let newName = req.body.newName;

  Topics.findOne({ name: name }).then(topic => {
    topic
      .update({ name: newName }, { where: { id: topic.id } })
      .then(updatedTopic => {
        res.json(updatedTopic);
      });
  });
}

module.exports = router;
