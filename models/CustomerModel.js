const mongoose = require('mongoose');

module.exports = (userModel) => {
    return userModel.discriminator(
        'Customer',
        new mongoose.Schema(
            {
                followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
                followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}],
                favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
                reviews: [{
                    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
                    review: String
                }]
            }));
};
