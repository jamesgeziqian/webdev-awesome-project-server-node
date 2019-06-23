module.exports = (app) => {
    const UserDao = require('../daos/UserDao');
    const CustomerDao = require('../daos/CustomerDao');
    const OrderDao = require('../daos/OrderDao');
    const RestaurantDao = require('../daos/RestaurantDao');

    const followCustomer = (req, res) => {
        const userId = req.params['uId'];
        const followingId = req.params['followingId'];
        if (req.session.userId
            && req.session.userId === req.params['uId']
            && req.session.userType === 'Customer') {
            CustomerDao.followUser(userId, followingId)
                .then((respond) => UserDao.findUserById(userId))
                .then((user) => res.json(user));
        } else {
            res.status(403).send({"message": "You have not logged in."});
        }
    };

    const favorRestaurant = (req, res) => {
        const userId = req.params['uId'];
        const restaurantId = req.params['rId'];
        if  (req.session.userId
            && req.session.userId === req.params['uId']
            && req.session.userType === 'Customer') {
            CustomerDao.favorRestaurant(userId, restaurantId)
                .then((respond) => res.json(respond));
        } else {
            res.status(403).send({"message": "You have not logged in."});
        }
    };

    const dislikeRestaurant = (req, res) => {
        const userId = req.params['uId'];
        const restaurantId = req.params['rId'];
        if  (req.session.userId
            && req.session.userId === req.params['uId']
            && req.session.userType === 'Customer') {
            CustomerDao.favorRestaurant(userId, restaurantId)
                .then((respond) => res.json(respond));
        } else {
            res.status(403).send({"message": "You have not logged in."});
        }
    };

    const checkRestaurant = (req, res, next) => {
        const restaurantId = req.params['rId'];
        RestaurantDao.findRestaurantById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    res.status(404).send({"message": "Restaurant has not been claimed by anyone"});
                } else {
                    next();
                }
            })
    };

    const makeOrder = (req, res) => {
        const restaurantId = req.params['rId'];
        if  (req.session.userId
            && req.session.userType === 'Customer') {
            OrderDao.createOrder({
                restaurant: restaurantId,
                customer: req.session.userId,
                orders: req.body
            }).then((order) => {
                res.send(order);
            })
        } else {
            res.status(403).send({"message": "You have not logged in."});
        }
    };

    app.put('/api/user/:uId/follows/:followingId', followCustomer);

    app.put('/api/customer/:uId/restaurant/:rId', favorRestaurant);

    app.delete('/api/customer/:uId/restaurant/:rId', dislikeRestaurant);

    app.post('/api/order/restaurant/:rId', checkRestaurant, makeOrder);
};
