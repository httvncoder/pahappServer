var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');


var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file


// Connection to DB
mongoose.connect(config.database, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});
app.set('superSecret', config.secret); // secret variable

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Import Models and controllers
var userMdl     = require('./models/userModel')(app, mongoose);
var userCtrl = require('./controllers/userController');

var evictionMdl     = require('./models/evictionModel')(app, mongoose);
var evictionCtrl = require('./controllers/evictionController');

var alertMdl     = require('./models/alertModel')(app, mongoose);
var alertCtrl = require('./controllers/alertController');

app.use(express.static(__dirname + '/web'));

// API routes ------------------------------------------------------
var apiRoutes = express.Router();

apiRoutes.route('/users')
  .get(userCtrl.findAllUsers)
  .post(userCtrl.addUser);
apiRoutes.route('/users/:id')
    .get(userCtrl.findById);
apiRoutes.route('/users/byusername/:username')
    .get(userCtrl.findUserByUsername);
apiRoutes.route('/auth')
    .post(userCtrl.login);

apiRoutes.route('/evictions')
  .get(evictionCtrl.findAllEvictions);



// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

apiRoutes.route('/users/:id')
  .put(userCtrl.updateActivity)
  .delete(userCtrl.deleteActivity);
  apiRoutes.route('/evictions')
    .post(evictionCtrl.addEviction);


app.use('/api', apiRoutes);
// end of API routes -------------------------------------

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
