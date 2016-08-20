
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

//GET - returns eviction by id
exports.findById = function(req, res) {
	evictionModel.findById(req.params.id, function(err, eviction) {
    	if(err) return res.send(500, err.message);
		res.status(200).jsonp(eviction);
	});
};

//POST - eviction
exports.addEviction = function(req, res) {
	//console.log('POST new user, name: ' + req.body.username);
	console.log(req.body);

	var eviction = new evictionModel({
		title: req.body.title,
		date: req.body.date,
	    hour:   req.body.hour,
	    direction:   req.body.direction,
	    description:   req.body.description,
	    access:   req.body.access,
	    city:   req.body.city,
		district: req.body.district,
		assembly: req.body.assembly
	});
	eviction.save(function(err, eviction) {
		if(err) return res.send(500, err.message);
        res.status(200).jsonp(eviction);
	});
};

//PUT - Update an eviction already exists
exports.updateEviction = function(req, res) {
	evictionModel.findById(req.params.id, function(err, eviction) {
		eviction.title   = req.body.title;
		eviction.date    = req.body.date;
		eviction.hour = req.body.hour;
		eviction.direction  = req.body.direction;
		eviction.description = req.body.description;
		eviction.access   = req.body.access;
		eviction.city = req.body.city;
		eviction.district = req.body.district;
		eviction.assembly = req.body.assembly;

		eviction.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(eviction);
		});
	});
};

//DELETE - Delete eviction by name of the eviction
exports.deleteEviction = function(req, res) {
	evictionModel.findById(req.params.id, function(err, eviction) {
		if (eviction) {
			eviction.remove(function(err) {
				if(err) return res.send(500, err.message);
	      		//res.status(200).jsonp(req.params.id);
				console.log("eviction with id" + req.params.id + " deleted");
				// after remove the eviction, returns the list of existing evictions
				evictionModel.find(function(err, evictions) {
					if(err) res.send(500, err.message);
					 res.status(200).jsonp(evictions);
				 });
			})
		}else{
			res.status(200).jsonp("eviction with id" + req.params.id + " not found");
		}
	});
};


exports.deleteByEvictionTitle = function(req, res) {
    evictionModel.find({
      title: req.params.evictiontitle
  }, function(err, evictions) {
console.log(evictions);
      if (err) throw err;

      if (!evictions) {
        res.json({ success: false, message: 'no eviction found' });
    } else if (evictions.length>0) {
        //console.log(evictions);
          // return the information including token as JSON
          //res.jsonp(eviction);
		  /*eviction.remove(function(err){
			  if(err) return res.send(500, err.message);
			  res.status(200).jsonp(req.params.id);
			  console.log('DELETE /evictions/' + req.params.id);
		  })*/
		  evictions.forEach(function(eviction){
			  eviction.remove(function (err) {
				  if(err) return res.send(500, err.message);
				   console.log("eviction " + req.params.evictiontitle + " deleted");


			   });
		  })
		  //un cop esborrats
		  //nose si retornar 'deleted' o la llista dels evictions que existeixen actualment
		  //després de l'eliminació
		  /*res.status(200).jsonp(req.params.evictiontitle + " deleted");*/

		  // after remove the eviction, returns the list of existing evictions
		  evictionModel.find(function(err, evictions) {
			  if(err) res.send(500, err.message);

			  console.log('GET /evictions');
			   res.status(200).jsonp(evictions);
		   });
      }else{

  		res.status(200).jsonp(req.params.evictiontitle + " not found");
		//res.json({ success: false, message: req.params.evictiontitle + " not found" });
	  }

    });
};
