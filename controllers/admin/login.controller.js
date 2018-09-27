const validator = require('validator');
let User = require("../../models/users/user.model");
const bcrypt = require("bcrypt"); 

exports.login = (req, res) => {
    if(req.session.userData)
    {
        //res.send("You are already Loged IN");
        res.redirect(adminUrl + "dashboard");
    }
    else{ 
        let flashmessage = req.flash("error");       
        res.render( adminPath + "login", { expressFlash: flashmessage});
    }
};

exports.loginNow = (req, res, next) => {

    email = req.body.email;
    password = req.body.password;
    isEmail = validator.isEmail(req.body.email);    
    if(isEmail)
    {
        let detailArray;

        User.getUserByEmail(email).then((userDetail) => { 
            if(userDetail) {
                detailArray = userDetail; 
                return  bcrypt.compare(password, userDetail.password);
            } else {
                return false;
            }
        }).then((isCorrectPassword) => {

            if(!isCorrectPassword) {
                req.flash('error', 'Please enter correct password!');
                res.render(adminPath + "login", { expressFlash: req.flash('error')});
            }
            else
            {
                if(typeof detailArray != undefined)
                {
                    req.session.userData = detailArray;
                    res.redirect(adminUrl + 'dashboard');
                }
            }

        }).catch((error) => {
            req.flash('error', 'Error authenticating user!');
            res.redirect(adminUrl + 'login');            
            next();
        });
    }
    else{
        req.flash('error', 'Please enter correct email!');
        res.render(adminPath + "login", { expressFlash: req.flash('error')});
    }
};

exports.register = (req, res) => {
    res.render( adminPath + "register");
};

exports.logout = (req, res) => {
    if(req.session.userData)
    {
        req.session.destroy();
        res.redirect( adminUrl + "login");
    }
    else{
        res.redirect( adminUrl + "login");
    }
};

exports.dashboard = (req, res) => {
    if(req.session.userData) {        
        res.render(adminPath + "dashboard");
    }
    else{
        res.redirect(adminUrl + "login");
    }
};