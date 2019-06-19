const RestaurantModel = require('../models/RestaurantModel');

const createRestaurant = (restaurant) => RestaurantModel.create(restaurant);

const findAllRestaurants = () => RestaurantModel.find();

const findRestaurantById = (restaurantId) => RestaurantModel.findById(restaurantId);

const updateRestaurant = (restaurantId, newRestaurant) =>
    RestaurantModel.update(
        {_id: restaurantId},
        {$set: {...newRestaurant}}
    );

const deleteRestaurant = (restaurantId) => RestaurantModel.remove({_id: restaurantId});

module.exports = {
    createRestaurant,
    findAllRestaurants,
    findRestaurantById,
    updateRestaurant,
    deleteRestaurant
};
