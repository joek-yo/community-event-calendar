const express = require('express');
const passport = require('passport');
const { addUser } = require('../models/user');
const router = express.Router();

// GET /register route
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// POST /register route
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  addUser(username, password);
  res.redirect('/login');
});

// GET /login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// POST /login route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
}));

// GET /logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
