var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1'
});

// Connecting Cassandra
client.connect(
  function (err, result) {
    console.log('Cassandra is connected in users.js');
  }
);

// Query
var getAllUsers = 'select * from shoutapp.users';

/* GET users listing. */
router.get('/', function (req, res) {
  client.execute(getAllUsers, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    }
    else {
      // res.json(result);
      res.render('users', {
        users: result.rows
      });
    }
  });
});

module.exports = router;
