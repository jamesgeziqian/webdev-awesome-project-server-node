const UserModel = require('../models/UserModel');

const createUser = (user) => UserModel.UserModel.create(user);

const findAllUsers = () => UserModel.UserModel.find();

const findUserById = (userId) => UserModel.UserModel.findById(userId);

const findUser = (condition) => UserModel.UserModel.findOne(condition);

const updateUser = (userId, newUser) =>
    UserModel.UserModel.update(
        {_id: userId},
        {$set: {...newUser}}
    );

const deleteUser = (userId) => UserModel.UserModel.remove({_id: userId});

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUser,
    updateUser,
    deleteUser
};
