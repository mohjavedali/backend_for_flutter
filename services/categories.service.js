const { response } = require("express");
const { MONGO_DB_CONFIG } = require("../config/app.config");
const {category} = require("../models/category.model");

async function createCategory(params, callback){
    if(!params.categoryName){
        return callback({
            message:"Category name required!"
        },"")
    }
    const model = new category(params);
    model.save().then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}
async function getCategories(params, callback){
    const categoryName = params.categoryName;
    var condition = categoryName?{
        categoryName:{$regex:new RegExp(categoryName), $options:"i"},
    }
    :{};
    let perPage = Math.abs(params.pageSize)||MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (MATH.abs(params.page) || 1)-1;
    category.find(condition, "categoryName categoryImage")
    .limit(perPage)
    .skip(perPage*page)
    .then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}

async function getCategoryById(params, callback){
    const categoryId = params.categoryId;

    category.findById(categoryId, "categoryName categoryImage")
    .then((response)=>{
        if(!response) callback("Not found Category with id"+categoryId);
        else callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
}

async function updateCategory(params, callback){
    const categoryId = params.categoryId;

    category.findByIdAndUpdate(categoryId, params, {useFindAndModify:false})
    .then((response)=>{
        if(!response) callback("Not found Category with id"+categoryId);
        else callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
} 

async function deleteCategory(params, callback){
    const categoryId = params.categoryId;

    category.findOneAndDelete(categoryId)
    .then((response)=>{
        if(!response) callback("Not found Category with id"+categoryId);
        else callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })
} 