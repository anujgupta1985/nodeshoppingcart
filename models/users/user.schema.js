const mongDB = require("../../config/database");

let mongoose = mongDB.mongoose;

let Schema = mongoose.Schema;

var users = new Schema({
    first_name : String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    added_date: Date,
    last_update: Date
});

module.exports = users;