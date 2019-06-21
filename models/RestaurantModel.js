const mongoose = require('mongoose');
const RestaurantSchema = require('./schemata/RestaurantSchema');

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

module.exports = RestaurantModel;
