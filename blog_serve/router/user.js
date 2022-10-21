const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 导入处理函数
const userHandler = require('../user_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
router.post('/register',expressJoi(reg_login_schema),userHandler.register)

// 登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

const uploadImage = multer({ dest: path.join(__dirname, '../uploads/image') })
// 图片路径
router.post('/uploadImage',uploadImage.single('file'),userHandler.uploadImage)
// 将路由对象共享出去
module.exports = router