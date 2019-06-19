const mongoose = require('mongoose');
const RestaurantModel = require('./RestaurantModel');

module.exports = (userModel) => {
    userModel.discriminator(
        'Customer',
        new mongoose.Schema(
            {
                followings: [mongoose.Schema.Types.ObjectId],
                followers: [mongoose.Schema.Types.ObjectId],
                favorites: [mongoose.Schema.Types.ObjectId],
                reviews: [{
                    restaurant: mongoose.Schema.Types.ObjectId,
                    review: String
                }]
            }));
};
