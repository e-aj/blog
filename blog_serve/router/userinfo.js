// 导入express
const express  = require('express')
// 创建路由对象
const router = express.Router()

const userinfo_handler = require('../user_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo',userinfo_handler.getUserinfo)

// 更新用户信息
router.post('userindo',userinfo_handler.postUserinfo)

// 向外共享路由
module.exports = router