const UserModel = require('../models/UserModel');

const followUser = (userId, followingId) => {
    return UserModel.findById(userId)
        .then((foundUser) => {
            console.log(foundUser);
            const newFollowings = Array.from(foundUser.followings);
            newFollowings.push(followingId);
            console.log(newFollowings);
            return UserModel.update(
                {_id: userId},
                {
                    "followings": newFollowings
                },
                (err, doc) => {
                    if (err) console.log(err);
                    console.log("successfully following");
                    console.log(doc);
                })
        }).then(() =>
            UserModel.findById(followingId)
        ).then((followedUser) =>
            UserModel.update(
                {_id: followingId},
                {
                    followers: followedUser.followers.push(userId)
                }
            )
        ).then(() =>
            UserModel.findById(userId)
        );
};

module.exports = {
    followUser
};
