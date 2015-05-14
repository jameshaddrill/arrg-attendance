// https://devcenter.heroku.com/articles/getting-started-with-nodejs
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#push-local-changes

// https://scotch.io/tutorials/creating-a-single-page--app-with-node-and-angular


// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    app.set('port', (process.env.PORT || 5000));

    // load the config
    var database = require('./config/database');

    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

     // load the routes
    require('./app/routes')(app);

    // listen (start app with node server.js) ======================================

    app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});