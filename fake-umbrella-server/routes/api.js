const mongoose = require('mongoose');
const express = require('express');
const app = require('express')();
const router = express.Router();

const dbHost = 'mongodb://database/mindbeacon';

mongoose.connect(dbHost);

const customerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  telephone: String,
  location: String,
  num_of_employees: Number
});

const Customer = mongoose.model('Customer', customerSchema);

app.get('/', (req, res) => {
  res.send('api works');
});

router.get('/customers', (req, res) => {
  console.log(req.params, '=========!');
  Customer.find({}, (err, users) => {
    if (err) res.status(500).send(error)

    res.status(200).json(users);
  });
});

router.get('/customers/:id', (req, res) => {
  Customer.findById(req.params.id, (err, users) => {
    if (err) res.status(500).send(error)

    res.status(200).json(users);
  });
});

router.delete('/customers/:id', (req, res) => {
  console.log('delete', '============', req.params.id)
  Customer.findByIdAndDelete(req.params.id, function(err) {
    if(err) console.log(err);
    console.log("Successful deletion");
    res.status(201).json({
      message: 'Deleted Successfully'
    });
  })
})

router.post('/customers', (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    contact: req.body.contact,
    telephone: req.body.telephone,
    location: req.body.location,
    num_of_employees: req.body.employees
  });
  customer.save(error => {
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
