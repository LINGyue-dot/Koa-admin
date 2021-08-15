/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 13:14:01
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-14 23:37:39
 * @Description: 
 */

const DATABASE_USER='back'
const DATABASE_PWD='csz51628'
const DATABASE_IP ='120.27.242.14'
const DATABASE_NAME='sharp'
const DATABASE_URL=`mongodb://${DATABASE_USER}:${DATABASE_PWD}@${DATABASE_IP}/${DATABASE_NAME}`


const TOKEN_PRIVATE_KEY='qianlong_token'

module.exports={
  DATABASE_URL,
  TOKEN_PRIVATE_KEY
}