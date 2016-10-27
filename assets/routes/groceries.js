"use strict";

var express = require('express');
var router = express.Router();
var GroceryListModel = require('../models/GroceryListModel');

/* GET */
router.get('/', function (req, res, next){
  GroceryListModel.find().exec()
  .then(groceries => res.json(groceries))
  .catch(err => next(err));
});

/* GET */
router.get('/:id', function (req, res, next){
  GroceryListModel.findById(req.params.id).exec()
  .then(grocery => res.json(grocery))
  .catch(err => next(err));
});

/* POST */
router.post('/', function (req, res, next){
  new GroceryListModel({
    item: req.body.item,
    quantity: req.body.quantity
  }).save()
  .then(grocery => res.json(grocery))
  .catch(err => next(err));
});

/* PUT */
router.put('/:id', function (req, res, next){
  GroceryListModel.findById(req.params.id).exec()
  .then(grocery => {
    grocery.item = req.body.item;
    grocery.quantity = req.body.quantity;
    return grocery.save();
  })
  .then(grocery => res.json(grocery))
  .catch(err => next(err));
});

/* DELETE */
router.delete('/:id', function (req, res, next) {
  GroceryListModel.findByIdAndRemove(req.params.id).exec()
  .then(grocery => res.json(grocery))
  .catch(err => next(err));
});

module.exports = router;
