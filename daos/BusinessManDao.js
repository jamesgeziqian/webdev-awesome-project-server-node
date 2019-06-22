const UserModel = require('../models/UserModel');
const RestaurantModel = require('../models/RestaurantModel');

const claimRestaurant = (userId, restaurantId) => {
    return RestaurantModel.updateOne(
        {_id: restaurantId},
        {
            $set: {
                owner: userId
            }
        },
        (err, doc) => {
            if (err) return console.log(err);
            console.log("successfully add owner");
            console.log(doc);
        }
    ).then(() =>
        UserModel.BusinessManModel.updateOne(
            {_id: userId},
            {
                $addToSet: {
                    restaurants: restaurantId
                }
            },
            (err, doc) => {
                if (err) return console.log(err);
                console.log("successfully add restaurant");
                console.log(doc);
            }
        )
    )
};

module.exports = {
    claimRestaurant
};
