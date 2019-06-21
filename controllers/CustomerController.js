module.exports = (app) => {
    const UserDao = require('../daos/UserDao');
    const CustomerDao = require('../daos/CustomerDao');

    const followCustomer = (req, res) => {
        const userId = req.params['uId'];
        const followingId = req.params['followingId'];
        if (req.session.username
            && req.session.userType === 'Customer') {
            CustomerDao.followUser(userId, followingId)
                .then((respond) => UserDao.findUserById(userId))
                .then((user) => res.json(user));
        } else {
            res.status(500).send({"message": "You have not logged in."});
        }
    };

    const favorRestaurant = (req, res) => {
        const userId = req.params['uId'];
        const restaurantId = req.params['rId'];
        if  (req.session.username
            && req.session.userType === 'Customer') {
            CustomerDao.favorRestaurant(userId, restaurantId)
                .then((respond) => res.json(respond));
        } else {
            res.status(500).send({"message": "You have not logged in."});
        }
    };

    app.put('/api/user/:uId/follows/:followingId', followCustomer);

    app.put('/api/customer/:uId/restaurant/:rId', favorRestaurant);
};
