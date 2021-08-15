/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 23:34:38
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-14 23:47:24
 * @Description: 
 */

const jsonwebtoken =require('jsonwebtoken')

const {TOKEN_PRIVATE_KEY} =require('../config')

module.exports={
  /**
   * 生成 token
   * @param {*} param0 
   * @returns 
   */
  generateToken({user_account}){
    return jsonwebtoken.sign({user_account},TOKEN_PRIVATE_KEY,{expiresIn:'1d'})
  }

}
