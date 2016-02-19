var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('./connect');
var random = require('./random');


router.post('/', function(req, res) {
    var addAnimal = {animal: req.body.animal, animal_count: 0};
        console.log(addAnimal);
        addAnimal.animal_count = random(0,100);
        console.log(addAnimal);
    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO animals (animal, animal_count) VALUES ($1, $2)",
            [addAnimal.animal, addAnimal.animal_count],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    console.log(result);
                    res.send(result);
                }
            });
    });

});

router.get('/', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client) {
        var query = client.query('SELECT * FROM animals ORDER BY id DESC;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;