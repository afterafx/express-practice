const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const passport = require('passport');
const Comment = require('../models/comments.model');
const User = require('../models/user.model');

const router = express.Router();

// get all comments ====================================
router.get('/', (req, res) => {
  Comment.find()
    .where('text')
    .regex(req.query.filter || '')
    .then(comments => res.json(comments));
});

// get single comments ===================================
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => (comment ? res.json(comment) : res.status(404).json({ message: 'Invalid ID' })))
    .catch(err => res.status(500).json(err));
});

// create comment =========================================
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      msg: 'Invalid syntax',
    });
  }

  Comment.create({ text: req.body.text, user: req.user._id })
    // update the user's comments
    .then(comment =>
      User.findByIdAndUpdate(req.user._id, {
        $push: { comments: comment._id },
      })
    )
    .then(() => Comment.find())
    .then(comments =>
      res.status(201).json({
        message: 'Comment successfully added',
        comments,
      })
    );
});

// update comment =========================================
router.put('/:id', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      msg: 'Invalid syntax: Please provide content',
    });
  }

  Comment.findByIdAndUpdate(req.params.id, { text: req.body.text })
    .then(comment => (comment ? Comment.find() : Promise.reject(new Error('Invalid ID'))))
    .then(comments => res.json({ message: 'Comment successfully updated', comments }))
    .catch(err => (err.message === 'Invalid ID' ? res.status(404).json(err) : res.status(500).json(err)));
});

// delete comment ==========================================
// findByIdAndDelete
router.delete('/:id', (req, res) => {
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
