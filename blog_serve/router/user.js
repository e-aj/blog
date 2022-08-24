const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入处理函数
const userHandler = require('../user_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

console.log(reg_login_schema)
// 注册新用户
router.post('/register',expressJoi(reg_login_schema),userHandler.register)

// 登录
router.post('/login',userHandler.login)

// 将路由对象共享出去
module.exports = router