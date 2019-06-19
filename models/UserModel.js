const mongoose = require('mongoose');
const UserSchema = require('./schemata/UserSchema');

const UserModel = mongoose.model('UserModel', UserSchema);
require('./CustomerModel')(UserModel);
require('./RestaurateurModel')(UserModel);

module.exports = UserModel;
