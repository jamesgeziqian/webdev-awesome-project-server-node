const mongoose = require('mongoose');

module.exports = (userModel) => {
    return userModel.discriminator(
        'BusinessMan',
        new mongoose.Schema(
            {
                restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}]
            }));
};
