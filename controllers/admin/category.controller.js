let Category = require("../../models/category/category.model");

exports.list = (req, res) => {
    Category.getCategories().then((catList) => {
        let flashmessage = { error : req.flash("error"), success : req.flash("success") };
        res.render(adminPath + "category/list",{result : catList, expressFlash : flashmessage});
    }).catch((error) => {
        console.log("Error in  list");
    });
}

exports.create = (req, res) => {

    Category.getCategories('enable').then((result) => {
       // console.log(result);
        res.render(adminPath + "category/add", {categories : result});
    }).catch((error) => {
        console.log("Error in getting category!");
    });
}

exports.save = (req, res) => {

    let parent_cat = req.body.parent_category;

    var data = { 
                name : req.body.category_name,
                description : req.body.description,
                subcategory : [{}],
                added_date : new Date,
                last_update : new Date
            }
    
    Category.create(data).then((result) => {
        console.log(result);
        res.redirect(adminUrl + "categories");
    }).catch((error) => {
        console.log(error);
    });
}

exports.editForm = (req, res) => {
    Category.getCategories("enable").then((result) => {
        let categ_id = req.params.cat_id;
        console.log(categ_id);
        Category.getCategory(categ_id).then((resData) => {
            console.log(resData);
            res.render(adminPath + "category/edit", {categories : result,catData : resData,category_id : categ_id});
        }).catch((error) => {
            console.log("Error in getting category detail!");
        });
    }).catch((err) => {
        console.log("Error in getting categories!");
    });
}