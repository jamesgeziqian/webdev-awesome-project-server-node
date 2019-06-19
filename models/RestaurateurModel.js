const mongoose = require('mongoose');
const UserModel = require('./UserModel');
const RestaurantSchema = require('./schemata/RestaurantSchema');

const RestaurateurModel = UserModel.discriminator(
    'RestaurateurModel',
    new mongoose.Schema(
        {
            restaurants: [RestaurantSchema]
        },
        {
            discriminatorKey: "type"
        }));

module.exports = RestaurateurModel;
