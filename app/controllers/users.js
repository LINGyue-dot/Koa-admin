/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 10:01:38
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 18:02:45
 * @Description: 
 */

const User =require('../models/user')

const {generateToken} =require('../utils/index')

const {Base,SuccessRequest,FailRequest} =require('../utils/api')


class Users{
  async find(ctx){
    // const res =new SuccessRequest(await User.find())
    const res =new FailRequest(ctx,402,'mess')
    ctx.body= res
  }

  async login(ctx){
    ctx.verifyParams({
      user_account:{type:'string',required:true},
      user_password:{type:'string',required:true}
    })
    const user =await User.findOne(ctx.request.body)
    if(!user){
      ctx.body= new FailRequest(ctx,401,'用户名或密码错误')
      return 
    }
    const {user_account}=user
    const token =generateToken({user_account})
    ctx.body={token}
  }
}


module.exports= new Users()