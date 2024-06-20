const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const routes = require('./routes/routes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // To serve static files
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
