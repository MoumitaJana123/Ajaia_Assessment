const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    // Seed test users
    if (email === 'alice@ajaia.test' || email === 'bob@ajaia.test') {
      let user = await User.findOne({ email });
      const hashedPassword = await bcrypt.hash('password123', 10);

      if (!user) {
        user = await User.create({
          email,
          password: hashedPassword,
          name: email.split('@')[0]
        });
      } else {
        user.password = hashedPassword;
        if (!user.name) {
          user.name = email.split('@')[0];
        }
        await user.save();
      }
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET || 'temporary_secret',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax'
    });

    return res.redirect('/documents');

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.render('login', { error: err.message });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
});

module.exports = router;
