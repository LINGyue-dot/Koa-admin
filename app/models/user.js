/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 15:59:18
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-14 21:41:18
 * @Description: 
 */

const mongoose = require('mongoose')

const {Schema,model} = mongoose

const userSchema = new Schema({
  _id:{type:String,default:Date.now()},
  user_account:{type:String,require:true},
  user_avatar:{type:String,default:''},
  user_password:{type:String,required:true,select:false}
  // _id:{type:String}
})

module.exports=model('User',userSchema)
