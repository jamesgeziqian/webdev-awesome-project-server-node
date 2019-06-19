const mongoose = require('mongoose');
const UserSchema = require('./schemata/UserSchema');

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
