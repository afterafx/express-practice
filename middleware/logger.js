const moment = require('moment');

// req, res are objects
// next is a callback function

const logger = (req, res, next) => {
  console.log(`${req.url} was requested at ${moment()}`);
  next();
};

module.exports = logger;