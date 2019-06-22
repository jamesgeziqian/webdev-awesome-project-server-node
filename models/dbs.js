const db = require('mongoose');

let mongodbURI = "mongodb://localhost:27017/webdev-awesome-project";
if (process.env.MONGODB_URI) {
    mongodbURI = process.env.MONGODB_URI;
}

module.exports = db.connect(mongodbURI, {useNewUrlParser: true});
