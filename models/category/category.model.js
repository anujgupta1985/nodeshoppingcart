const mongDb = require("../../config/database");
const catSchema = require("./category.schema");

const moongose = mongDb.mongoose;

const catModel = moongose.model("Categories",catSchema);

function create(data)
{
    return new Promise((resolve, reject) => {
        catModel.create(data, (err, result) => {
            if(err) {
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
}

function getCategories(status=false)
{
    let srchQry = {};

    if(status)
    {
        srchQry = {status : status };
    }

    return new Promise((resolve, reject) => {
        catModel.find(srchQry, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getCategory(cat_id) {
    return new Promise((resolve, reject) => {
        catModel.findOne({_id : cat_id}, (error, res) => {
            if(error){
                reject(error);
            }else{
                resolve(res);
            }
        });
    });
}

module.exports = {
    create : create,
    getCategories : getCategories,
    getCategory : getCategory
}