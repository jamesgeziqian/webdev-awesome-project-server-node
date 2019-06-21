module.exports = (app) => {
    const RestaurantDao = require('../daos/RestaurantDao');
    const BusinessManDao = require('../daos/BusinessManDao');

    const checkClaimed = (req, res, next) => {
        const yelpId = req.params['yelpId'];
        RestaurantDao.findRestaurantByYelp(yelpId)
            .then((restaurant) => {
                if (restaurant) {
                    res.status(500).send("Restaurant has already been claimed!");
                } else {
                    next();
                }
            });
    };

    const claimRestaurant = (req, res) => {
        const userId = req.params['uId'];
        const yelpId = req.params['yelpId'];
        RestaurantDao.createRestaurant(
            {
                yelpId: yelpId
            }
        ).then((restaurant) =>
            BusinessManDao.claimRestaurant(userId, restaurant._id)
        ).then((respond) => res.json(respond));
    };

    app.put('/api/business/:uId/restaurant/:yelpId', checkClaimed, claimRestaurant);
};
