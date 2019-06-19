const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
    {
        menu: [String],
        price: String,
        openHours: [String],
        address: String,
        stars: Number,
        reviews: [String]
    }
);

module.exports = RestaurantSchema;
