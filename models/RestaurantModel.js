const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
    {
        menu: [String],
        price: String,
        openHours: [String],
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'BusinessMan'},
        address: String,
        stars: Number,
        yelpId: String,
        favoringCustomers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
        historyOrders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
    }
);

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

module.exports = RestaurantModel;
