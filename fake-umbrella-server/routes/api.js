const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const dbHost = 'mongodb://database/mindbeacon';

mongoose.connect(dbHost);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error)

    res.status(200).json(users);
  });
});

router.get('/users/:id', (req, res) => {
  User.findById(req.param.id, (err, users) => {
    if (err) res.status(500).send(error)

    res.status(200).json(users);
  });
});

router.post('/users', (req, res) => {
  let user = new User({
    name: req.body.name,
    age: req.body.age
  });

  user.save(error => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: 'User created successfully'
    });
  });
});

// GET api listing.
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
