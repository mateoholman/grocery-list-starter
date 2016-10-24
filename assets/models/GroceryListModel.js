"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our Schema
const groceryListSchema = new Schema ({
  'item' : String
});

// export our model
module.exports = mongoose.model('GroceryList', groceryListSchema);
