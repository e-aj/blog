// 导入express模块
const express = require('express')

const cors = require('cors')



// 创建express的服务器实例
const app = express()

app.use(cors())

app.use(express.urlencoded({extended:false}))



// 导入路由
const userRouter = require('./router/user')
app.use('/api',userRouter)

app.listen(3333,()=>{
    console.log('项目运行')
})