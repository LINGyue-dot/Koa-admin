/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-14 09:48:16
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-14 15:57:33
 * @Description:
 */
const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const error = require("koa-json-error");
const parameter = require("koa-parameter"); //
const mongoose = require("mongoose");
const cors = require("koa-cors");

const routing = require("./routes");

const app = new koa();

const { DATABASE_URL } = require("./config");

mongoose.connect(
  DATABASE_URL,
  {
    authSource: "admin", // 权限认证
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log("MongoDB connecte successfully!!!!!!!!!!")
);
mongoose.connection.on("error", console.error);

app.use(error());
app.use(cors());
app.use(bodyparser());

app.use(parameter(app)); // 验证参数使得 ctx 存在 vertifaction method

routing(app);

require("./websocket");

app.listen(3100, () => console.log("app launch in port 3100"));
