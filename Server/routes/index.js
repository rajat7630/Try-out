const express = require('express');
<<<<<<< HEAD
=======

>>>>>>> feat: pubnub frontend added of admin and user
const router = express.Router();
const passport = require('passport');
const redis = require('redis');
const jwt = require('jsonwebtoken');

/* GET home page. */

<<<<<<< HEAD
var client = redis.createClient(process.env.REDIS_URL);
=======
const client = redis.createClient(process.env.REDIS_URL);
>>>>>>> feat: pubnub frontend added of admin and user

client.on('connect', () => {
  console.log('Redis client connected');
});
client.on('error', (error) => {
  console.log('Redis not connected');
});

<<<<<<< HEAD
router.get('/', function (req, res, next) {
=======
<<<<<<< HEAD
router.get('/', function(req, res, next) {
=======
router.get('/', (_req, res) => {
>>>>>>> feat: pubnub frontend added of admin and user
>>>>>>> feat: pubnub frontend added of admin and user
  res.render('index', { title: 'Express' });
});

/* GET Google Authentication API. */
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
<<<<<<< HEAD
  function (req, res) {
=======
<<<<<<< HEAD
  function(req, res) {
>>>>>>> feat: pubnub frontend added of admin and user
    var token = req.user.token;
    console.log(req.user);

    const jwt_secret = 'secret';
    const jwt_expiration = 60 * 10;
    const jwt_refresh_expiration = 60 * 60 * 20;

    //let refresh_token = generate_refresh_token(64);
    // let refresh_token_maxage = new Date() + jwt_refresh_expiration;

    let token1 = jwt.sign({ uid: token, username: req.user.name }, jwt_secret, {
      expiresIn: jwt_expiration,
    });
    console.log(token1);
    console.log(jwt.decode(token1));
    client.set(
      token1,
      JSON.stringify({
        expires: jwt_expiration,
      }),
      redis.print
    );

    res.cookie('access_token', token1, {
      httpOnly: false,
    });
    res.cookie('admin_name', req.user.name, {
      httpOnly: false,
    });

    res.redirect('http://localhost:5000/admin');
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.clearCookie('access_token', 'admin_email');
=======
  (req, res) => {
    const { token } = req.user;
    const userEmail = req.user.email;

    // eslint-disable-next-line camelcase
    const jwt_secret = 'secret';
    // eslint-disable-next-line camelcase
    const jwt_expiration = 60 * 10;

    // let refresh_token = generate_refresh_token(64);
    // let refresh_token_maxage = new Date() + jwt_refresh_expiration;

    const token1 = jwt.sign({ uid: token }, jwt_secret, {
      expiresIn: jwt_expiration,
    });

    client.set(
      token1,
      JSON.stringify({
        expires: jwt_expiration,
      }),
      // eslint-disable-next-line comma-dangle
      redis.print
    );

    res.cookie('access_token', token1, {
      httpOnly: false,
    });
    res.cookie('access_email', userEmail, {
      httpOnly: false,
    });

    res.redirect('http://localhost:5000/admin');
    // eslint-disable-next-line comma-dangle
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('access_token');
  res.clearCookie('access_email');
>>>>>>> feat: pubnub frontend added of admin and user
  res.redirect('http://localhost:5000');
});

module.exports = router;
