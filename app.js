"use strict";

// dependencies from node
const path = require('path');

// dependencies from npm
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GroceryListModel = require('./assets/models/GroceryListModel.js');

// Initialize our app
const app = express();

// establish connection to the database
mongoose.connect('mongodb://localhost/grocery-list');

// Set our views directory
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set our static directory
app.use(express.static(__dirname + '/assets'));

/* GET home page. */
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

/* POST Create a grocery list item */
app.post('/', (req, res, next) => {
  var groceryItem = new GroceryListModel({
        item : req.body.item
  });

  groceryItem.save((err, item) => {
        // Inserts are run asynchronously.
        // So we have to pass in a callback to be ran when the insert is finished
    console.log(item);
    res.redirect('/');
  });
});

// Set up our server
const port = 3000;
app.listen(port, () => console.log(`Server listening on: ${port}`));
