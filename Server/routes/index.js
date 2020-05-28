const express = require('express');

const router = express.Router();
const passport = require('passport'); 
const redis = require('redis');
const jwt = require('jsonwebtoken');

/* GET home page. */
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
  console.log('Redis client connected');
});
client.on('error', (error) => {
  console.log('Redis not connected');
});

router.get('/', (_req, res) => {
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
  (req, res) => {
    const { token } = req.user;
    const userEmail = req.user.email;

    // eslint-disable-next-line camelcase
    const jwt_secret = 'secret';
    // eslint-disable-next-line camelcase
    const jwt_expiration = 60 * 10;

    // let refresh_token = generate_refresh_token(64);
    // let refresh_token_maxage = new Date() + jwt_refresh_expiration;

    const token1 = jwt.sign(
      { uid: token, username: req.user.name },
      jwt_secret,
      {
        expiresIn: jwt_expiration,
      }
    );

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
    res.cookie('mode', 'day', {
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
  res.clearCookie('mode');
  res.redirect('http://localhost:5000');
});

module.exports = router;
