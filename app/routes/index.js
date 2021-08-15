/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 09:57:04
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-14 10:32:35
 * @Description: 自动化引入路由文件
 */

const fs =require('fs')

module.exports=(app)=>{
  fs.readdirSync(__dirname).forEach(file=>{
    if(file==='index.js'){return }
    const route =require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods());
  })
}