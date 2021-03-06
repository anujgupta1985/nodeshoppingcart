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
       // console.log(result); return;
        var catJs = ["category.js"];
        //console.log(catJs);
        res.render(adminPath + "category/add", {categories : result, pageJS : catJs});
    }).catch((error) => {
        console.log("Error in getting category!");
    });
}

exports.save = (req, res) => {

    let parent_cat = req.body.parent_category;
    var catName = req.body.category_name;
    var catslug = catName.replace(" ", "-");

    var parentName = "";
    var slug = "";

    if(parent_cat == "") {
        parentName = "/";
        slug = parentName  + catslug;
    } else {
        parentName = parent_cat;
        slug = parentName + "/" + catslug;
    }
         
    var data = { 
                name : catName,
                description : req.body.description,
                parent : parentName,
                slug : slug,
                added_date : new Date,
                last_update : new Date
            };

    Category.create(data).then((result) => {
        //console.log(result);
        req.flash('success', 'Category added successfully.');
        res.redirect(adminUrl + "categories");
    }).catch((error) => {
        console.log(error);
    });
}

exports.editForm = (req, res) => {
    Category.getCategories("enable").then((result) => {
        let categ_id = req.params.cat_id;
        //console.log(categ_id);
        Category.getCategory(categ_id).then((resData) => {
            //console.log(resData);
            res.render(adminPath + "category/edit", {categories : result,catData : resData,category_id : categ_id});
        }).catch((error) => {
            console.log("Error in getting category detail!");
        });
    }).catch((err) => {
        console.log("Error in getting categories!");
    });
}

exports.delete = (req, res) => {
    Category.deleteCat(req.params.cat_id).then((result) => {
        if(result) {
            req.flash('success', 'Category deleted successfully.');
            res.redirect(adminUrl + "categories");
        }
    }).catch((err) => {
        console.log("Error in deleting category!");
    });
}

exports.getSubcategory = (req, res) => {
    return true;
}