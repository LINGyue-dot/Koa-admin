/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 10:05:15
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 23:19:53
 * @Description: 
 */

const jwt =require('koa-jwt')
const Router =require('koa-router')
const router =new Router({prefix:'/api/users'})

const {TOKEN_PRIVATE_KEY}=require('../config')

const auth =jwt({secret:TOKEN_PRIVATE_KEY})

// jwt 验证中间件 注意 koa-jwt 也是基于 jsonwebtoken 的
// const jsonwebtoken =require('jsonwebtoken')
// const auths =async(ctx,next)=>{
//   const {authorization=''} =ctx.header
//   const token =authorization.replace('Bearer ','')
//   try{
//     const user =jsonwebtoken.verify(token,TOKEN_PRIVATE_KEY)
//     ctx.state.user=user
//   }catch(err){
//     ctx.throw(401,err.message)
//   }
//   await next()
// }

const {
  find ,login
}=require('../controllers/users')

router.get('/',find)

router.post('/login',login)

module.exports=router