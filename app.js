const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
