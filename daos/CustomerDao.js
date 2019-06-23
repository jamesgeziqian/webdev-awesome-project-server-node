const UserModel = require('../models/UserModel');
const RestaurantModel = require('../models/RestaurantModel');

const followUser = (userId, followingId) => {
    return UserModel.CustomerModel.updateOne(
        {_id: userId},
        {
            $addToSet: {
                followings: followingId
            }
        })
        .then(() =>
            UserModel.CustomerModel.updateOne(
                {_id: followingId},
                {
                    $addToSet: {
                        followers: userId
                    }
                }));
};

const unfollowUser = (userId, followingId) => {
    return UserModel.CustomerModel.updateOne(
        {_id: userId},
        {
            $pull: {
                followings: followingId
            }
        })
        .then(() =>
            UserModel.CustomerModel.updateOne(
                {_id: followingId},
                {
                    $pull: {
                        followers: userId
                    }
                }));
};

const favorRestaurant = (userId, restaurantId) => {
    return UserModel.CustomerModel.updateOne(
        {_id: userId},
        {
            $addToSet: {
                favorites: restaurantId
            }
        },
        (err, doc) => {
            if (err) return console.log(err);
            console.log("successfully like a restaurant");
            console.log(doc);
        }
    ).then(() =>
        RestaurantModel.updateOne(
            {_id: restaurantId},
            {
                $inc: {
                    stars: 1
                },
                $addToSet: {
                    favoringCustomers: userId
                }
            },
            (err, doc) => {
                if (err) return console.log(err);
                console.log("successfully liked by a customer");
                console.log(doc);
            }
        )
    )
};

const dislikeRestaurant = (userId, restaurantId) => {
    return UserModel.CustomerModel.updateOne(
        {_id: userId},
        {
            $pull: {
                favorites: restaurantId
            }
        },
        (err, doc) => {
            if (err) return console.log(err);
            console.log("successfully like a restaurant");
            console.log(doc);
        }
    ).then(() =>
        RestaurantModel.updateOne(
            {_id: restaurantId},
            {
                $inc: {
                    stars: -1
                },
                $pull: {
                    favoringCustomers: userId
                }
            },
            (err, doc) => {
                if (err) return console.log(err);
                console.log("successfully liked by a customer");
                console.log(doc);
            }
        )
    )
};

module.exports = {
    favorRestaurant,
    followUser,
    dislikeRestaurant,
    unfollowUser
};
