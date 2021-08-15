/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 17:07:04
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 17:18:34
 * @Description: 返回 api 结构封装
 */

class Base{

  constructor(code,message,result){
    this.code =code
    this.message=message
    this.result=result
  }
}

class SuccessRequest extends Base{
  constructor(result){
    super(200,'success',result)
  }
}

class FailRequest extends Base{
  constructor(ctx,code,message){
    super(code,message,{})
    ctx.status=code
  }
}

module.exports={
  Base,
  SuccessRequest,
  FailRequest
}