const express = require("express");
//const app = express();

const router = express.Router();

let ctrlLogin = require("./controllers/admin/login.controller");
let ctrlUsers = require("./controllers/admin/users.controller");

let checkIsLogedIn = (req , res, next ) => {
    if(req.session.userData)
    {
        next();
    }
    else{
        res.redirect( adminUrl + "login");
    }
   
};

router.get("/", ctrlLogin.login);
router.get("/login", ctrlLogin.login);
router.post("/", ctrlLogin.loginNow);
router.post("/login", ctrlLogin.loginNow);
router.get("/logout", ctrlLogin.logout);
router.get("/register", ctrlLogin.register);
router.get("/dashboard" , checkIsLogedIn, ctrlLogin.dashboard);
// User functions //
router.get("/users", checkIsLogedIn, ctrlUsers.users);
router.get("/users/add", checkIsLogedIn, ctrlUsers.create);
router.get("/users/:user_id", checkIsLogedIn, ctrlUsers.editUser);
router.post("/users/add", checkIsLogedIn, ctrlUsers.save);
router.post("/users/:user_id", checkIsLogedIn, ctrlUsers.saveUser);
router.get("/users/delete/:user_id", checkIsLogedIn, ctrlUsers.delete);

// category functions //

let ctrlCategory = require("./controllers/admin/category.controller");

router.get("/categories/add", ctrlCategory.create);
router.post("/categories/add", ctrlCategory.save);
router.get("/categories", ctrlCategory.list);
router.get("/categories/:cat_id", ctrlCategory.editForm);
router.get("/categories/delete/:cat_id", ctrlCategory.delete);
router.get("/getsubcategory", ctrlCategory.getSubcategory);

module.exports = router;