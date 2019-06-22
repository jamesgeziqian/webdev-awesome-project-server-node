module.exports = (app) => {
    const userDao = require('../daos/UserDao');

    const login = (req, res) => {
        if (!req.session.userId){
            userDao.findUser(
                {username: req.body.username, password: req.body.password}
                ).then((user) => {
                    if (user) {
                        req.session.regenerate(function(err) {
                            if (err) {
                                console.log("session regenerating error");
                                return console.log(err);
                            } else {
                                req.session.userId = user._id;
                                req.session.userType = user.userType;
                                req.session.save();
                                res.status(200).send({"message": "Login success"});
                            }
                        });
                    } else {
                        res.status(500).send({"message": "Login failed"});
                    }
                })
        } else {
            res.status(200).send({"message": "Already logged in"});
        }
    };

    const profile = (req, res) => {
        if (req.session.userId
            && req.session.userId === req.params['uId']) {
            userDao.findUser({_id: req.params['uId']})
                .then((user) => {
                    res.send(user);
                });
        } else {
            userDao.findUserById(req.params['uId'])
                .then((user) => {
                    res.send(user);
                });
        }
    };

    const checkLogin = (req, res) => {
        if (req.session.userId) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    };

    const logout = (req, res) => {
        if (req.session.userId) {
            req.session.destroy((err) => {
                if (err) {
                    console.log("session destroying error");
                    console.log(err);
                    res.status(500).send({"message": "session closing failed"});
                } else {
                    res.status(200).send({"message": "session closed"});
                }
            });
        } else {
            res.status(200).send({"message": "Not logged in"})
        }
    };

    const createUser = (req, res) => {
        userDao.createUser(req.body).then((user) => res.json(user));
    };

    const findAllUsers = (req, res) => {
        userDao.findAllUsers()
            .populate('followings')
            .populate('followers')
            .populate('restaurants')
            .then((users) => res.json(users));
    };

    const findUserById = (req, res) => {
        userDao.findUserById(req.params['uId'])
            .populate('followings')
            .populate('followers')
            .populate('restaurants')
            .populate('orders')
            .then((user) => res.json(user));
    };

    const updateUser = (req, res) => {
        userDao.updateUser(req.params['uId'], req.body).then(() => res.sendStatus(200));
    };

    const deleteUser = (req, res) => {
        userDao.deleteUser(req.params['uId']).then((status) => res.json(status));
    };

    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/checkLogin', checkLogin);

    app.get('/api/profile/:uId', profile);

    app.post('/api/user', createUser);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:uId', findUserById);
    app.put('/api/user/:uId', updateUser);
    app.delete('/api/user/:uId', deleteUser);
};
