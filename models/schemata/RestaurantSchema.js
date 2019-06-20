const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
    {
        menu: [String],
        price: String,
        openHours: [String],
        address: String,
        stars: Number,
        yelpId: String,
        favoringCustomers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
        reviews: [String]
    }
);

module.exports = RestaurantSchema;
