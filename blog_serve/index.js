// 导入express模块
const express = require("express");

const cors = require("cors");

const joi = require("joi");

const config = require("./config");

const expressJWT = require("express-jwt");



// 创建express的服务器实例
const app = express();

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 跨域
app.use(cors());

app.use(express.urlencoded({ extended: false }));

// 错误中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message,
    });
  }
  res.send({
    status: 1,
    message: err.message,
  });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
});

// 导入路由
const userRouter = require("./router/user");
app.use("/api", userRouter);

app.listen(3333, () => {
  console.log("项目运行");
});
