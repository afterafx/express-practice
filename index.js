require('dotenv').config();
const express = require('express');
const path = require('path');
// const logger = require('./middleware/logger')
const commentsRouter = require('./routes/comments');

const app = express();

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

/*  Setup middleware */

// body parser middleware
app.use(express.json());
// form data
app.use(express.urlencoded({
  extended: false
}));

// logger middleware
// app.use(logger);


// setup static middleware
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));