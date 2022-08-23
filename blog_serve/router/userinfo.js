// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 获取用户的基本信息
router.get('/userinfo',(res,req)=>{
    res.send('ok')
})

// 向外共享路由对象
module.export = router