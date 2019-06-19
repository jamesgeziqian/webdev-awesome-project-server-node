module.exports = (app) => {
    const UserDao = require('../daos/UserDao');
    const CustomerDao = require('../daos/CustomerDao');

    const followCustomer = (req, res) => {
        const userId = req.params['uId'];
        const followingId = req.params['followingId'];
        CustomerDao.followUser(userId, followingId)
            .then((respond) => UserDao.findUserById(userId))
            .then((user) => res.json(user));
    };

    app.put('/api/user/:uId/follows/:followingId', followCustomer);
};
