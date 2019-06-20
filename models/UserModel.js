const mongoose = require('mongoose');
const UserSchema = require('./schemata/UserSchema');

const UserModel = mongoose.model('UserModel', UserSchema);
const CustomerModel = require('./CustomerModel')(UserModel);
const BusinessManModel = require('./BusinessManModel')(UserModel);

module.exports = {UserModel, CustomerModel, BusinessManModel};
