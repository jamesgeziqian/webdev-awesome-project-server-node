module.exports = (app) => {
    const userDao = require('../daos/UserDao');

    const login = (req, res) => {
        if (!req.session.username){
            userDao.findUser(
                {username: req.body.username, password: req.body.password}
                ).then((user) => {
                    if (user) {
                        req.session.regenerate(function(err) {
                            if (err) {
                                console.log("session regenerating error");
                                return console.log(err);
                            } else {
                                req.session.username = req.body.username;
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
        res.status(200).send({"message": "here"});
    };

    const logout = (req, res) => {
        if (req.session.username) {
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

    app.get('/api/profile', profile);

    app.post('/api/user', createUser);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:uId', findUserById);
    app.put('/api/user/:uId', updateUser);
    app.delete('/api/user/:uId', deleteUser);
};
