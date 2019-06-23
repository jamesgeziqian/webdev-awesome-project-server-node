module.exports = (app) => {
    const RestaurantDao = require('../daos/RestaurantDao');

    const findRestaurantByYelp = (req, res) => {
        const yelpId = req.params['yelpId'];
        RestaurantDao.findRestaurantByYelp(yelpId)
            .populate('owner')
            .populate('favoringCustomers')
            .populate('historyOrders')
            .then((restaurant) => {
                if (restaurant) {
                    res.status(200).send(restaurant);
                } else {
                    res.status(404).send({"message": "This restaurant is not hosted."});
                }
            });
    };

    const findAllRestaurants = (req, res) => {
        RestaurantDao.findAllRestaurants()
            .populate('owner')
            .populate('favoringCustomers')
            .populate('historyOrders')
            .then((restaurants) => {
                res.send(restaurants);
            });
    };

    app.get('./api/restaurant/:yelpId', findRestaurantByYelp);
    app.get('./api/restaurant', findAllRestaurants);
};
