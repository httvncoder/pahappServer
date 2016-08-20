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

//poder accedir al server i interactuar
app.use(express.static(__dirname + '/webAdmin'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Import Models and controllers
var assemblyMdl     = require('./models/assemblyModel')(app, mongoose);
var assemblyCtrl = require('./controllers/assemblyController');

var evictionMdl     = require('./models/evictionModel')(app, mongoose);
var evictionCtrl = require('./controllers/evictionController');

var alertMdl     = require('./models/alertModel')(app, mongoose);
var alertCtrl = require('./controllers/alertController');

app.use(express.static(__dirname + '/web'));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API routes ------------------------------------------------------
var apiRoutes = express.Router();

apiRoutes.route('/assemblies')
  .get(assemblyCtrl.findAllAssemblies)
  .post(assemblyCtrl.addAssembly);
apiRoutes.route('/assemblies/:id')
    .get(assemblyCtrl.findById);
apiRoutes.route('/assemblies/byassemblyname/:assemblyname')
    .get(assemblyCtrl.findUserByUsername);
apiRoutes.route('/assemblies/auth')
    .post(assemblyCtrl.login);

apiRoutes.route('/evictions')
  .get(evictionCtrl.findAllEvictions);
apiRoutes.route('/evictions/:id')
  .get(evictionCtrl.findById);



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
    return res.status(200).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

apiRoutes.route('/assemblies/:id')
  .put(assemblyCtrl.updateActivity)
  .delete(assemblyCtrl.deleteActivity);
apiRoutes.route('/evictions')
    .post(evictionCtrl.addEviction);

apiRoutes.route('/evictions/:id')
  .put(evictionCtrl.updateEviction)
    .delete(evictionCtrl.deleteEviction);
apiRoutes.route('/evictions/byname/:evictiontitle')
    .delete(evictionCtrl.deleteByEvictionTitle);


app.use('/api', apiRoutes);
// end of API routes -------------------------------------

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
