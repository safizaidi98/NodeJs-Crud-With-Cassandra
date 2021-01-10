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
        console.log('Cassandra is connected in addUser.js');
    }
);

router.get('/', function (req, res) {
    res.render('addUser');
});

var upsertUser = 'Insert into shoutapp.users(username, password, email, name) values (?, ?, ?, ?)';

router.post('/', function (req, res) {
    client.execute(upsertUser, [req.body.username, req.body.password, req.body.email, req.body.fullname],
        function (err, result) {
            if (err) {
                res.status(404).send({ msg: err });
            } else {
                console.log('User added');
                res.redirect('/users'); 
            }
        });
});

module.exports = router;
