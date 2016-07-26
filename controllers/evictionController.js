
var mongoose = require('mongoose');
var evictionModel  = mongoose.model('evictionModel');

/* */
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express         = require("express");
var app             = express();
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
/* */

//GET - Return all tvshows in the DB
exports.findAllEvictions = function(req, res) {
	evictionModel.find(function(err, evictions) {
    if(err) res.send(500, err.message);

    console.log('GET /evictions');
		res.status(200).jsonp(evictions);
	});
};

//POST - eviction
exports.addEviction = function(req, res) {
	//console.log('POST new user, name: ' + req.body.username);
	console.log(req.body);

	var eviction = new evictionModel({
		title: req.body.title,
		day: req.body.day,
	    hour:   req.body.hour,
	    direction:   req.body.direction,
	    description:   req.body.description,
	    access:   req.body.access,
	    city:   req.body.city,
		district: req.body.district
	});

	eviction.save(function(err, eviction) {
		if(err) return res.send(500, err.message);
        res.status(200).jsonp(eviction);
	});
};
