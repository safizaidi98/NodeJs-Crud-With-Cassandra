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

var getbyUsername = 'select * from shoutapp.users where username = ?';

router.get('/:username', function (req, res) {
    client.execute(getbyUsername, [req.params.username], function (err, result) {
        if (err) {
            res.status(404).send({ msg: err });
        } else {
            res.render('editUser', {
                username: result.rows[0].username,
                email: result.rows[0].email,
                name: result.rows[0].name,
                password: result.rows[0].password
            });
        }
    });
});

var upsertUser = 'Insert into shoutapp.users(username, password, email, name) values (?, ?, ?, ?)';

router.post('/', function (req, res) {
    client.execute(upsertUser, [req.body.username, req.body.password, req.body.email, req.body.fullname],
        function (err, result) {
            if (err) {
                res.status(404).send({ msg: err });
            } else {
                console.log('User Updated');
                res.redirect('/displayUser/' + req.body.username );
            }
        });
});

module.exports = router;
