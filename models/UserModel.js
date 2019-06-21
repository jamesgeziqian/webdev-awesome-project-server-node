const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        phone: Number,
        zip: Number,
        email: String
    },
    {
        discriminatorKey: "userType"
    });

const UserModel = mongoose.model('UserModel', UserSchema);
const CustomerModel = require('./CustomerModel')(UserModel);
const BusinessManModel = require('./BusinessManModel')(UserModel);

module.exports = {UserModel, CustomerModel, BusinessManModel};
