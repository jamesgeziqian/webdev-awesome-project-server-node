const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String
    },
    {
        discriminatorKey: "userType"
    });

module.exports = UserSchema;
