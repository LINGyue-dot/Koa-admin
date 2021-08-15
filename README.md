# Koa-admin

此项目为 [Vue3-TS-Vite-Ant-admin](https://github.com/LINGyue-dot/Vue3-TS-Vite-Ant-admin) 后台

## 实战配置

### 全部依赖

* nodemon
* koa
* koa-cors



### 环境配置

生产环境和上线环境可借助 `cross-env` 来切换

```
cross-env NODE_ENV=production node app // 生产环境
nodemon app // 
```





### 项目结构

资源文件放在 app 文件夹下

```shell
- routes // 路由控制
- controllers // 路由具体方法实现
- models // 数据库层
```





以下为 example



#### controllers

路由具体方法实现，最好以类实现最后以实例对象导出

```js
// home.js

class Home{
    getHome(ctx){
        //...
    }
}

module.export = new Home()
```







#### routes

home.js

```js
const Router = require('koa-router')
const router = new Router({prefix:'/'}) // prefix
// router.get('/',(ctx)=>{
//    // ...
//})
// 引入 controllers 后
const home = require('../controllers/home')
router.get('/',home.getHome)
```



// index.js 下的

自动化读取 routes 下的每个路由中间件并应用

```js
// routes/index.js

const fs = require('fs')
module.exports = (app) =>{
    fs.readdirSync(__dirname).forEach(file =>{ // 读取当前文件夹下文件
		if(file === 'index.js'){return }
        const route = require(`./${'file'}`)
        app.use(route.routes()).use(route.allowedMethods());
    })
}

```



#### models

数据库模型层

以 mongodb 为例

```js
// home.js

const mongoose = require('mongoose')
const {Schema,model} = mongoose

const userSchema = new Schema({
    name:{type:String,required:true},
    age:{type:String,deafult:'12'}
})

module.exports = model('User',useSchema)
```









## 错误处理

大致需要进行对 404 4xx 5xx 三种错误码进行错误处理

404 koa 自带已经帮助处理

其余 4xx 的错误可以直接用 `ctx.throw(4xx,[message])` 抛出

5xx 错误一般是服务端就需要手动 try catch 捕获错误



可以用 `koa-json-error`

 

### 手写简陋错误处理中间件

大致思路：在所有中间件之前应用该错误处理中间件，当有错误时候就 catch

```js
// index.js
app.use(async (ctx,next)=>{
	try{
		await next()
	}catch(err){
		ctx.status = err.status || err.statusCode || 500;
		ctx.body={
			//...
		}
	}
})
```





### 422 错误（请求携带参数错误）

`koa-parameter`

```js
// index.js
app.use(parameter(app)) // 全局注册方法

// controllers/home.js
 getHome(ctx){
     ctx.verifyParams({
        name:{type:'string',required:true}
     })
}
```









### jwt 等 token 权限配置

`jsonwebtoken`

```js
// auth 认证中间件
const auth = async ()=>{
    const {authorization=''}=ctx.request.header
    const token = authorization.replace('Bear ','')
    try{
        const user = jsonwebtoken.verify(token,sercet)
        ctx.state.user=user // 将此时获取到的 user 信息存储
        // 默认将 ctx.state 作为信息存储的作用域
    }catch(err){ // 修正 unauthorizate http 状态码
        ctx.throw(401,err.message)
    }
    await next()
}

// 验证是否操作的与验证所得的是否相符
async checkOwner(ctx,nect){
    if(ctx.params.id!==ctx.state.user._id){ctx.throw(403,'无权限')}
    await next()
}

// routes/user.js 路由中间件中使用
router.delete('/:id',auth,checkOwner,del)
```



或者直接使用 `koa-jwt` 直接验证操作等

