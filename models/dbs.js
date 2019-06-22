const db = require('mongoose');

// let mongodbURI = "mongodb://localhost:27017";
// if (process.env.MONGODB_URI) {
//     mongodbURI = process.env.MONGODB_URI;
// }

mongodbURI = "mongodb://heroku_1429tlr3:a5e5mu5ffe8b1her4oa6klmfpo@ds341837.mlab.com:41837/heroku_1429tlr3/webdev-awesome-project";

module.exports = db.connect(mongodbURI, {useNewUrlParser: true});
