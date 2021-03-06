module.exports = (app) => {
    const RestaurantDao = require('../daos/RestaurantDao');
    const BusinessManDao = require('../daos/BusinessManDao');

    const checkClaimed = (req, res, next) => {
        const yelpId = req.params['yelpId'];
        RestaurantDao.findRestaurantByYelp(yelpId)
            .then((restaurant) => {
                if (restaurant) {
                    console.log(restaurant);
                    res.status(403).send({"message": "Restaurant has already been claimed!"});
                } else {
                    next();
                }
            });
    };

    const claimRestaurant = (req, res) => {
        const yelpId = req.params['yelpId'];
        const name = req.query['name'];
        if (req.session.userId
            && req.session.userType === 'BusinessMan') {
            RestaurantDao.createRestaurant(
                {
                    name: name,
                    yelpId: yelpId
                }
            ).then((restaurant) =>
                BusinessManDao.claimRestaurant(req.session.userId, restaurant._id)
            ).then((respond) => res.json(respond));
        } else {
            res.status(403).send({"message": "You have not logged in."});
        }
    };

    const checkRestaurantForUpdate = (req, res, next) => {
        const restaurantId = req.params['restaurantId'];
        RestaurantDao.findRestaurantById(restaurantId)
            .then((restaurant) => {
                if (!restaurant) {
                    res.status(404).send({"message": "Restaurant is not been hosted"})
                } else if (!req.session.userId
                    || req.session.userType !== 'BusinessMan') {
                    res.status(403).send({"message": "You have not logged in."});
                } else if (restaurant.owner.toString() !== req.session.userId.toString()) {
                    res.status(403).send({"message": "You do not own this restaurant"});
                } else {
                    next();
                }
            })
    };

    const updateRestaurant = (req, res) => {
        const restaurantId = req.params['restaurantId'];
        RestaurantDao.updateRestaurant(restaurantId, req.body)
            .then((restaurant) => res.send(restaurant));
    };

    const dropRestaurant = (req, res) => {
        const restaurantId = req.params['restaurantId'];
        RestaurantDao.deleteRestaurant(restaurantId)
            .then(() => res.send({"message": "Successfully dropped restaurant"}))
    };

    app.post('/api/restaurant/:yelpId', checkClaimed, claimRestaurant);
    app.put('/api/restaurant/:restaurantId', checkRestaurantForUpdate, updateRestaurant);
    app.delete('/api/restaurant/:restaurantId', checkRestaurantForUpdate, dropRestaurant);
};
