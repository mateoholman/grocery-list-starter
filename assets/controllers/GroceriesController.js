"use strict";

var GroceryListModel = require('../models/GroceryListModel');

module.exports = {
  list: function (req, res, next){
    GroceryListModel.find().exec()
    .then(groceries => res.json(groceries))
    .catch(err => next(err));
  },

  show: function (req, res, next){
    GroceryListModel.findById(req.params.id).exec()
    .then(grocery => res.json(grocery))
    .catch(err => next(err));
  },

  create: function (req, res, next){
    new GroceryListModel({
      item: req.body.item,
      quantity: req.body.quantity
    }).save()
    .then(grocery => res.json(grocery))
    .catch(err => next(err));
  },

  update: function (req, res, next){
    GroceryListModel.findById(req.params.id).exec()
    .then(grocery => {
      grocery.item = req.body.item;
      grocery.quantity = req.body.quantity;
      return grocery.save();
    })
    .then(grocery => res.json(grocery))
    .catch(err => next(err));
  },

  delete: function (req, res, next) {
    GroceryListModel.findByIdAndRemove(req.params.id).exec()
    .then(grocery => res.json(grocery))
    .catch(err => next(err));
  }
};
