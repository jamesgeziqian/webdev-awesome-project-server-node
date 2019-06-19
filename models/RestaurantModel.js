const mongoose = require('mongoose');
const RestaurantSchema = require('./schemata/RestaurantSchema');

const RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);
