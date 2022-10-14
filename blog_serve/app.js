// 导入expressm模块
const express = require('express')
// 创建express的服务器实例
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json({limit:'600mb'})); //解决请求体过大传不过来的问题
app.use(bodyParser.urlencoded({ limit:'600mb',extended:true}))

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 导入cors中间件
const cors = require('cors')
// 将cors注册为全局中间件
app.use(cors())

// 设置后可以用 req.body 获取 POST 传入 data
app.use(express.json())

// 导入配置文件
const config = require('./config')

// 解析token中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 错误中间件
app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError') return res.send({status:5,message:'身份认证失败！'})
})


//路由 
// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)

// 信息模块
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

// 文章分类
const artcate = require('./router/artcate')
app.use('/my',artcate)

// 文章
const article = require('./router/article')
app.use('/my',article)


// 启动web服务器
app.listen(3333,()=>{
    console.log('启动成功')
})