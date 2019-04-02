const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Invalid Syntax: please provide a username and password' });
  }
  // create a new user
  // req has a body with username and password
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then(user => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).json({ message: 'User successfully created', user: userObj });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Invalid username and password' });
  }

  // find the user in the db
  const user = await User.findOne({ username: req.body.username });

  // check to make sure the user exists
  if (!user) return res.status(400).json({ message: 'Invalid username!' });

  // compare the passwords
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (isMatch) {
    // sign a jwt
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    return res.json({ message: 'Successfully logged in', token: `Bearer ${token}` });
  }
  return res.status(401).json({ message: 'Invalid username and password!' });
});

module.exports = router;
