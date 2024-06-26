const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken'); // Import the authentication middleware


// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/me - Get the currently logged-in user
router.get('/me', authenticateToken, (req, res) => {
  res.json(sanitizeUser(req.user));
});

// GET /users/:id - Get a single user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// POST /users - Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id - Update a user
router.put('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.friends != null) {
    res.user.friends = req.body.friends;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id - Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne({_id: res.user._id});
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users/login - Authenticate a user
router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


// Middleware function to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// Function to remove sensitive fields
function sanitizeUser(user) {
  const { password, ...sanitizedUser } = user.toObject();
  return sanitizedUser;
}

module.exports = router;
