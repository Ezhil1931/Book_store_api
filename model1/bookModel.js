import mongoose from "mongoose";

const dataUse= new mongoose.Schema({
name:String,
author:String,
year:Number,
created:{
    type:Date,
    default:Date.now()
}

})



export const data =mongoose.model("datas",dataUse)