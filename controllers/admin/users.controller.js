let User = require("../../models/users/user.model");

//// Add library to encrytion and decrytion /////

const bcrypt = require("bcrypt");

exports.users = (req, res) => {
    User.getUsers().then((users) => {
        let flashmessage = { error : req.flash("error"), success : req.flash("success") };
        res.render(adminPath + "users/list",{allUsers : users, expressFlash : flashmessage});
    }).catch(() => {
        res.send("Error to get users");
    });
}

exports.create = (req, res) => {    
    res.render(adminPath + "users/add");
}

exports.editUser = (req, res) => {

    let user_id = req.params.user_id;

    User.getUserById(user_id).then((result) => {
        console.log(result);
        res.render(adminPath + "users/edit", { userData : result });
    }).catch((e) => {
        req.flash("error", "User not found!");
        res.redirect(adminUrl + "users");
    });
}

exports.save = (req, res, next) => { 
    let pass = req.body.password;

    bcrypt.hash(pass, 10).then(function(hashedPassword) {

        let data = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
            added_date : new Date(),
            last_update : new Date()
        };

        return User.create(data);

    }).then(() => {
        res.redirect(adminUrl + "users");
    }).catch((error) => {
        console.log("Error saving user: ");
        console.log(error);
        next();
    });
}

exports.saveUser = (req, res) => {

    let user_id = req.params.user_id;
    let newdata = {first_name : req.body.first_name , last_name : req.body.last_name, username : req.body.username};
    User.updateUser(user_id, newdata).then((result) => {
        req.flash("success", "User updated successfully.")
        res.redirect(adminUrl + "users");
    }).catch((e) => {
        req.flash("error", "User can not be updated.")
        res.redirect(adminUrl + "users");
    });
}

exports.delete = (req, res) => {
    let user_id = req.params.user_id;

    User.deleteUser(user_id).then((result) => {
        req.flash("success" , "User deleted successfully.");
        res.redirect(adminUrl + "users");
    }).catch(() => {
        req.flash("error" , "User can not be deleted now!");
        res.redirect(adminUrl + "users");
    });
}