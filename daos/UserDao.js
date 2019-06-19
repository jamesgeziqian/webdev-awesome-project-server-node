const UserModel = require('../models/UserModel');

const createUser = (user) => UserModel.create(user);

const findAllUsers = () => UserModel.find();

const findUserById = (userId) => UserModel.findById(userId);

const updateUser = (userId, newUser) =>
    UserModel.update(
        {_id: userId},
        {$set: {...newUser}}
    );

const deleteUser = (userId) => UserModel.remove({_id: userId});

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
};
