// 导入express
const express  = require('express')
// 创建路由对象
const router = express.Router()

const expressJoi = require('@escook/express-joi')

const userinfo_handler = require('../user_handler/userinfo')

const {update_password_schema } = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo',userinfo_handler.getUserinfo)

// 更新用户信息
router.post('/userindo',userinfo_handler.postUserinfo)

// 重置密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)


// 向外共享路由
module.exports = router