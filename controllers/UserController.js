module.exports = (app) => {
    const userDao = require('../daos/UserDao');

    const createUser = (req, res) => {
        console.log("createUser at dao");
        userDao.createUser(req.body).then((user) => res.json(user));
    };

    const findAllUsers = (req, res) => {
        userDao.findAllUsers().then((users) => res.json(users));
    };

    const findUserById = (req, res) => {
        userDao.findUserById(req.params['uId']).then((user) => res.json(user));
    };

    const updateUser = (req, res) => {
        userDao.updateUser(req.params['uId'], req.body).then(() => res.sendStatus(200));
    };

    const deleteUser = (req, res) => {
        userDao.deleteUser(req.params['uId']).then((status) => res.json(status));
    };

    app.post('/api/user', createUser);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:uId', findUserById);
    app.put('/api/user/:uId', updateUser);
    app.delete('/api/user/:uId', deleteUser);
};
