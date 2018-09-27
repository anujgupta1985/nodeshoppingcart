const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/shoppingcart');
mongoose.connect('mongodb://anujshop:Anuj1234@ds125402.mlab.com:25402/anujshop');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

module.exports.db = db;
module.exports.mongoose = mongoose;
