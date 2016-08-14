//File: controllers/tvshows.js
var mongoose = require('mongoose');
var assemblyModel  = mongoose.model('assemblyModel');

/* */
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express         = require("express");
var app             = express();
var config = require('../config'); // get our config file
app.set('superSecret', config.secret); // secret variable
/* */

//GET - Return all tvshows in the DB
exports.findAllAssemblies = function(req, res) {
	assemblyModel.find(function(err, assemblies) {
    if(err) res.send(500, err.message);

    console.log('GET /assemblies');
		res.status(200).jsonp(assemblies);
	});
};

//GET - returns assemblies
exports.findById = function(req, res) {
	assemblyModel.findById(req.params.id, function(err, assembly) {
    if(err) return res.send(500, err.message);

    console.log('GET /assemblies/' + req.params.id);
		res.status(200).jsonp(assembly);
	});
};

exports.findUserByUsername = function(req, res) {
    assemblyModel.find({
      name: req.params.assemblyname
  }, function(err, assembly) {

      if (err) throw err;

      if (!assembly) {
        res.json({ success: false, message: 'no assembly found' });
    } else if (assembly) {
        console.log(assembly);
          // return the information including token as JSON
          res.jsonp(assembly);


      }

    });
};

//POST - Insert a new TVShow in the DB
exports.addAssembly = function(req, res) {
	console.log('POST new assembly, name: ' + req.body.name);
	console.log(req.body);

	var assembly = new assemblyModel({
		name: req.body.name,
		password: req.body.password,
		mail: req.body.mail,
		direction: req.body.direction,
	    description:   req.body.description,
	    city:   req.body.city,
	    district:   req.body.mail
	});

	assembly.save(function(err, assembly) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(assembly);
	});
};

//PUT - Update a register already exists
exports.updateActivity = function(req, res) {
	ActivityModel.findById(req.params.id, function(err, tvshow) {
		tvshow.title   = req.body.petId;
		tvshow.year    = req.body.year;
		tvshow.country = req.body.country;
		tvshow.poster  = req.body.poster;
		tvshow.seasons = req.body.seasons;
		tvshow.genre   = req.body.genre;
		tvshow.summary = req.body.summary;

		tvshow.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteActivity = function(req, res) {
	ActivityModel.findById(req.params.id, function(err, activity) {
		activity.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(req.params.id);
		    console.log('DELETE /activities/' + req.params.id);
		})
	});
};


//POST - auth assembly
exports.login = function(req, res) {
	// find the assembly
  assemblyModel.findOne({
    name: req.body.name
}, function(err, assembly) {

    if (err) throw err;

    if (!assembly) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (assembly) {

      // check if password matches
      if (assembly.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if assembly is found and password is right
        // create a token
        var token = jwt.sign(assembly, app.get('superSecret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
		  expiresIn: '60m'
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
};
