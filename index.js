require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('./passport');
// const logger = require('./middleware/logger')
const commentsRouter = require('./routes/comments');
const authRouter = require('./routes/auth');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/message-board?retryWrites=true`,
  { useNewUrlParser: true }
);

const app = express();

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

/*  Setup middleware */

// body parser middleware
app.use(express.json());
// form data
app.use(
  express.urlencoded({
    extended: false,
  })
);

// cors middleware =================================
app.use(cors());

// logger middleware
// app.use(logger);

// setup static middleware ==========================
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(passport.initialize());
passport.use(JwtStrategy);

// routing ==========================================
app.use('/api/comments', commentsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
