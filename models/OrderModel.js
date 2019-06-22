const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    orders: [String]
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
