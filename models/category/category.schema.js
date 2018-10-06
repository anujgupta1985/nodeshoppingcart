const mongDB = require("../../config/database");

const mongoose = mongDB.mongoose;
let Schema = mongoose.Schema;

var Category = new Schema({
    name : String,
    description : {type : String},
    parent : {type: String},
    slug : {type: String},
    status : {type: String, enum: ['enable', 'disable'], default : 'enable'},
    added_date : Date,
    last_update: Date
});

module.exports = Category;
