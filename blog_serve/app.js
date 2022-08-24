// 导入expressm模块
const express = require('express')
// 创建express的服务器实例
const app = express()

// 导入cors中间件
const cors = require('cors')
// 将cors注册为全局中间件
app.use(cors())

// 设置后可以用 req.body 获取 POST 传入 data
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)


// 启动web服务器
app.listen(3333,()=>{
    console.log('启动成功')
})