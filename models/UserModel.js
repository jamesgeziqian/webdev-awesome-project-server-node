const mongoose = require('mongoose');
const UserSchema = require('./schemata/UserSchema');

const UserModel = mongoose.model('UserModel', UserSchema);
const CustomerModel = require('./CustomerModel')(UserModel);
const RestaurantModel = require('./RestaurateurModel')(UserModel);

module.exports = {UserModel, CustomerModel, RestaurantModel};
