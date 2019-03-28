const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const Comment = require('../models/comments.model');

const router = express.Router();

// get all comments
router.get('/', (req, res) => {
  // let comments = db
  //   .get('comments')
  //   .value();
  // if (req.query.filter) {
  //   const filterText = req.query.filter;
  //   comments = comments.filter(comment => comment.text.toLowerCase().includes(filterText.toLowerCase()));
  // }
  // res.json(comments);
  Comment.find()
    .where('text')
    .regex(req.query.filter || '')
    .then(comments => res.json(comments));
});

// get single comments
router.get('/:id', (req, res) => {
  // const myComment = db
  //   .get('comments')
  //   .find({
  //     id: req.params.id,
  //   })
  //   .value();
  // if (myComment) {
  //   res.json(myComment);
  // } else {
  //   res.status(404).json({
  //     msg: 'Invalid ID',
  //   });
  // }
  Comment.findById(req.params.id)
    .then(comment => (comment ? res.json(comment) : res.status(404).json({ message: 'Invalid ID' })))
    .catch(err => res.status(500).json(err));
});

// create comment
router.post('/', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      msg: 'Invalid syntax: Please provide content',
    });
  }
  // // create a new comment with the text
  // // timestamp: moment()
  // // id should be shortid
  // // add it to commentData
  // const newComment = {
  //   text: req.body.text,
  //   id: shortid.generate(),
  //   timestamp: moment().format(),
  // };
  // db.get('comments')
  //   .push(newComment)
  //   .write();
  // // return all the comments (makes sure the new comment is included)
  // res.status(201).json({
  //   msg: 'Comment successfully added',
  //   comments: db.get('comments').value(),
  // });
  // // BONUS: if request has no body text (or text is empty) send proper error code and maybe a message
  // // res.json(req.body);

  Comment.create({ text: req.body.text })
    .then(() => Comment.find())
    .then(comments =>
      res.status(201).json({
        message: 'Comment successfully added',
        comments,
      })
    );
});

// update comment
router.put('/:id', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      msg: 'Invalid syntax: Please provide content',
    });
  }

  // // check if db has a comment with id of req.params.id
  // if (
  //   !db
  //     .get('comments')
  //     .find({
  //       id: req.params.id,
  //     })
  //     .value()
  // ) {
  //   res.status(404).json({
  //     msg: 'Invaild Id',
  //   });
  // }

  // db.get('comments')
  //   .find({
  //     id: req.params.id,
  //   })
  //   .assign({
  //     text: req.body.text,
  //   })
  //   .write();

  // return res.json(db.get('comments').value());
  // Comment.findByIdAndUpdate(req.params.id, { text: req.body.text })
  //   .then(() => Comment.find())
  //   .then(comments =>
  //     res.status(201).json({
  //       message: 'Comment Successfully Updated',
  //       comments,
  //     })
  //   );
  Comment.findByIdAndUpdate(req.params.id, { text: req.body.text })
    .then(comment => (comment ? Comment.find() : Promise.reject(new Error('Invalid ID'))))
    .then(comments => res.json({ message: 'Comment successfully updated', comments }))
    .catch(err => (err.message === 'Invalid ID' ? res.status(404).json(err) : res.status(500).json(err)));
});

// delete comment
// findByIdAndDelete
router.delete('/:id', (req, res) => {
  // // check if db has a comment with id of req.params.id
  // if (
  //   !db
  //     .get('comments')
  //     .find({
  //       id: req.params.id,
  //     })
  //     .value()
  // ) {
  //   res.status(404).json({
  //     msg: 'Invaild Id',
  //   });
  // }
  // db.get('comments')
  //   .remove({
  //     id: req.params.id,
  //   })
  //   .write();
  // res.status(200).json({
  //   msg: 'Comment successfully deleted',
  //   comments: db.get('comments').value(),
  // });
  Comment.findByIdAndDelete(req.params.id)
    .then(comment => (comment ? Comment.find() : Promise.reject(new Error('Invalid ID'))))
    .then(comments =>
      res.status(200).json({
        message: 'Comment Deleted',
        comments,
      })
    )
    .catch(err => (err.message === 'Invalid ID' ? res.status(404).json(err) : res.status(500).json(err)));
});

module.exports = router;
