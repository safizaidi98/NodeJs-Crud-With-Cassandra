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

//Query

var getByUserName = 'Select * from shoutapp.users where username = ?';

// Get request
router.get('/:username', function (req, res) {
    client.execute(getByUserName, [req.params.username], function (err, result) {
        if (err) {
            res.status(404).send({ msg: err })
        } else {
            res.render('displayUser', {
                username: result.rows[0].username,
                email: result.rows[0].email,
                name : result.rows[0].name
            });
        }
    });
});

var deleteUser = 'delete from shoutapp.users where username = ?';

router.delete('/:username', function(req, res){
    client.execute(deleteUser, [req.params.username], function(err, result){
        if (err) {
            res.status(404).send({ msg: err })
        } else {
            // res.render('displayUser', {
            //     username: result.rows[0].username,
            //     email: result.rows[0].email,
            //     name : result.rows[0].name
            // });
            res.json(result);
        }
    });
});

module.exports = router;

