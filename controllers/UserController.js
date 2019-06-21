module.exports = (app) => {
    const userDao = require('../daos/UserDao');

    const login = (req, res) => {
        const session = req.session;
        if (!session.username){
            userDao.findUser(
                {username: req.body.username, password: req.body.password}
                ).then((user) => {
                    if (user) {
                        session.regenerate(req,(err) => {
                            if (err) {
                                console.log("session regenerating error");
                                return console.log(err);
                            } else {
                                session.username = req.body.username;
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

    const logout = (req, res) => {
        const session = req.session;
        if (session.username) {
            session.destroy((err) => {
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
            .then((users) => res.json(users));
    };

    const findUserById = (req, res) => {
        userDao.findUserById(req.params['uId'])
            .populate('followings')
            .populate('followers')
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

    app.post('/api/user', createUser);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:uId', findUserById);
    app.put('/api/user/:uId', updateUser);
    app.delete('/api/user/:uId', deleteUser);
};
