const mongDB = require("../../config/database");
const userSchema = require("./user.schema");
let mongoose = mongDB.mongoose;

var userModel = mongoose.model('Users', userSchema);

function create(data)
{
    return new Promise((resolve, reject) => {       
        userModel.create(data,(err, result) => {
            if(err)
            {
                reject("Error in create a user!");
            }
            else{
                resolve(result);
            }
        });
    });
}

function getUsers()
{
    return new Promise(function(resolve, reject) {
        userModel.find((err, result) => {        
            if(err) {
                reject(err);
            }
            else {            
                resolve(result);         
            }
        });
    });
}

function getUser(data)
{
    return new Promise(function(resolve, reject) {
        userModel.findOne({email : data.email, password : data.password },(err, result) => {
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

function getUserByEmail(emailId)
{
    return new Promise(function(resolve, reject) {
        userModel.findOne({email : emailId },(err, result) => {
            if(err)
            {
                reject(err);
            }
            else{
                if(result){
                    resolve(result);
                } else {
                    reject(false);
                }
                
            }
        });
    });
}

function getUserById(user_id) {

    let result = new Promise((resolve, reject) => {
        let whereCon = { _id : user_id };
        userModel.findOne(whereCon, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });

    return result;
}

function deleteUser(user_id)
{
    let result = new Promise((resolve, reject) => {

        let whereCon = { _id : user_id };
        userModel.deleteOne(whereCon, (err , reslt) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(reslt);
            }
        });
    });

    return result;
}

function updateUser(user_id, userdata)
{
    return new Promise((resolve, reject) => {

        let whereCon = { _id : user_id };
        let newData = { first_name : userdata.first_name, last_name : userdata.last_name, username: userdata.username };
        userModel.updateOne(whereCon , newData, (err, res) => {
            if(res){
                resolve(res);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = {
    create: create,
    getUsers: getUsers,
    getUser: getUser,
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser
};