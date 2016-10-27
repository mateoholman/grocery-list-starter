"use strict";

var express = require('express');
var router = express.Router();
const GroceriesController = require('../controllers/GroceriesController');

/* GET */
router.get('/', GroceriesController.list);

/* GET */
router.get('/:id', GroceriesController.show);

/* POST */
router.post('/', GroceriesController.create);

/* PUT */
router.put('/:id', GroceriesController.update);

/* DELETE */
router.delete('/:id', GroceriesController.delete);

module.exports = router;
