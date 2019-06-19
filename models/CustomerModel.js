const mongoose = require('mongoose');

module.exports = (userModel) => {
    userModel.discriminator(
        'Customer',
        new mongoose.Schema(
            {
                followings: Array,
                followers: Array,
                favorites: [String],
                reviews: [String]
            }));
};
