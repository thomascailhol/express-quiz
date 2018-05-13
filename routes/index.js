const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const request = require('request');

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    env: env, 
    title: 'Welcome to Express-Quiz' 
  });
});

// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
    req.logout();
  	res.redirect('/');
});

router.get('/user', ensureLoggedIn, function(req, res, next) {
    res.render('user', { 
      env: env, 
      user: req.user 
    });
});

router.get('/callback', 
	passport.authenticate('auth0', { 
    failureRedirect: '/' 
  }), 
	function(req, res) {
    res.redirect(req.session.returnTo || '/courses');
});

module.exports = router;
