"use strict";

// dependencies from node
const path = require('path');

// dependencies from npm
const express = require('express');
const app = express();                      //Initialize our app
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

// Configure our app to use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/assets'));

// Set our views directory
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');

// Set our routes
const groceries = require('./assets/routes/groceries');
app.use('/groceries', groceries);
app.use('/*', function (req, res, next) {
  res.redirect('/groceries');
});



// establish connection to the database
mongoose.connect('mongodb://localhost/grocery-list');


app.use(function (err, req, res, next) {
  res.json(err);
});

/* GET home page *
app.get('/', (req, res, next) => {
    // Here we are asking mongoose to find GroceryListModels,
    // we are not passing any specifice attributes, such
    // as an id, so mongoose will find all tasks.
  GroceryListModel.find((err, groceries) => {
    // Queries are run asynchronously.
        // So we have to pass in a callback to be ran when the db query is finished
    res.render('index', {
      groceries: groceries
    });
  });
});
*/

/* POST Create a grocery list item
app.post('/', (req, res, next) => {
  var groceryItem = new GroceryListModel({
        item : req.body.item,
        quantity: req.body.quantity
  });

  groceryItem.save((err, item) => {
        // Inserts are run asynchronously.
        // So we have to pass in a callback to be ran when the insert is finished
    res.redirect('/');
  });
});
*/

// Set up our server
const port = 3000;
app.listen(port, () => console.log(`Server listening on: ${port}`));
