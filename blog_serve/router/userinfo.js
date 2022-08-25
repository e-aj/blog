// 导入express
const express  = require('express')
// 创建路由对象
const router = express.Router()

const userinfo_handler = require('../user_handler/userinfo')

// 获取用户的基本信息
router.post('/userinfo',userinfo_handler.getUserinfo)

// 向外共享路由
module.exports = router