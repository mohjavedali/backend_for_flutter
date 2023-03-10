const mongoose = require("mongoose");

const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            categoryName:{
                type:String,
                require:true,
                unique:true,
            },
            categoryDecription:{
                type:String,
                require:false
            },
            categoryImage:{
                type:String
            }
        }
    )
);
module.exports = {category};