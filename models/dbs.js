const db = require('mongoose');

let mongodbURI = "mongodb://localhost:27017";
if (process.env.MONGODB_URI) {
    mongodbURI = process.env.MONGODB_URI;
}

mongodbURI += "/webdev-awesome-project";

module.exports = db.connect(mongodbURI, {useNewUrlParser: true});
