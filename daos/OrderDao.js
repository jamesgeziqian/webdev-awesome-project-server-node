const OrderModel = require('../models/OrderModel');
const RestaurantModel = require('../models/RestaurantModel');
const UserModel = require('../models/UserModel');

const createOrder = (order) =>
    OrderModel.create(order)
        .then((respond) => {
            UserModel.CustomerModel.findOneAndUpdate(
                {_id: respond.customer},
                {
                    $addToSet: {
                        orders: respond._id
                    }
                },
                (err, doc) => {
                    if (err) return console.log(err);
                    console.log("successfully updated user");
                    console.log(doc);
                });
            RestaurantModel.findOneAndUpdate(
                {_id: respond.restaurant},
                {
                    $addToSet: {
                        historyOrders: respond._id
                    }
                },
                (err, doc) => {
                    if (err) return console.log(err);
                    console.log("successfully updated restaurant");
                    console.log(doc);
                });
            return respond;
        });

const findOrderById = (orderId) => OrderModel.findById(orderId);

const findOrder = (condition) => OrderModel.find(condition);

module.exports = {
    createOrder,
    findOrderById,
    findOrder
};
