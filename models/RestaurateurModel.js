const mongoose = require('mongoose');
const RestaurantSchema = require('./schemata/RestaurantSchema');

module.exports = (userModel) => {
    userModel.discriminator(
        'Restaurateur',
        new mongoose.Schema(
            {
                restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: RestaurantSchema}]
            }));
};
