const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const commentData = require('../data');


const router = express.Router();

// get all comments
router.get('/', (req, res) => {
  res.json(commentData);
});

// get single comments
router.get('/:id', (req, res) => {
  const myComment = commentData.find(comment => comment.id === parseInt(req.params.id));
  if (myComment) {
    res.json(myComment);
  } else {
    res.status(404).json({
      msg: 'Invalid ID'
    });
  }
});

// create comment
router.post('/', (req, res) => {
  if (!res.body.text) {
    res.status(400).json({
      msg: 'Invalid syntax: Please provide content'
    })
  }
  // create a new comment with the text
  // timestamp: moment()
  // id should be shortid
  // add it to commentData

  commentData.push({
    text: req.body.text,
    id: shortid.generate(),
    timestamp: moment().format()
  });

  // return all the comments (makes sure the new comment is included)
  res.status(201).res.json({
    msg: 'Comment successfully added',
    comments: commentData
  });

  // BONUS: if request has no body text (or text is empty) send proper error code and maybe a message
  // res.json(req.body);
});

// update comment
router.put('/:id', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      msg: 'Invalid syntax: Please provide content'
    })
  }

  const myComment = commentData.find(comment => comment.id === parseInt(req.params.id));

  if (!myComment) {
    res.status(404).json({
      msg: 'Invaild Id'
    })
  }
  myComment.text = req.body.text;

  res.status(201).json({
    msg: 'Comment successfully updated',
    comments: commentData
  })
});

// delete comment
router.delete('/:id', (req, res) => {
  const myIndex = commentData.findIndex(comment => comment.id === parseInt(req.params.id));

  if (myIndex < 0) {
    res.status(404).json({
      msg: 'Invalid ID'
    });
  }

  commentData.splice(myIndex, 1);

  res.status(200).json({
    msg: 'Comment successfully deleted',
    comments: commentData
  });


});

module.exports = router;