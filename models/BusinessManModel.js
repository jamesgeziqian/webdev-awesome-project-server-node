const mongoose = require('mongoose');
const RestaurantSchema = require('./schemata/RestaurantSchema');

module.exports = (userModel) => {
    return userModel.discriminator(
        'BusinessMan',
        new mongoose.Schema(
            {
                restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: RestaurantSchema}]
            }));
};
