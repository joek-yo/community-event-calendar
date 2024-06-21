const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const app = express();

// Middleware setup
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware to handle form submissions
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// User serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Replace this with your user lookup logic
  const user = { id: 1, username: 'exampleUser' };
  done(null, user);
});

// Local strategy for authentication
passport.use(new LocalStrategy((username, password, done) => {
  // Replace this with your user authentication logic
  if (username === 'exampleUser' && password === 'examplePassword') {
    return done(null, { id: 1, username: 'exampleUser' });
  }
  return done(null, false, { message: 'Incorrect credentials.' });
}));

// Routes
const routes = require('./routes/routes');
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
