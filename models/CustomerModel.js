const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const CustomerModel = UserModel.discriminator(
    'CustomerModel',
    new mongoose.Schema(
        {
            followings: Array,
            followers: Array,
            favorites: [String],
            reviews: [String]
        },
        {
            discriminatorKey: "type"
        }));

module.exports = CustomerModel;
