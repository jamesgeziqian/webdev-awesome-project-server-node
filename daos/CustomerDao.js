const UserModel = require('../models/UserModel');

const followUser = (userId, followingId) => {
    console.log("inside Dao");
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
                    $push: {
                        followers: userId
                    }
                }));
};

module.exports = {
    followUser
};
