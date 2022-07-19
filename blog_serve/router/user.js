const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi')

const {reg_login_schema } =  require('../schema/user.js') 

// 注册新用户
router.post('/register',expressJoi(reg_login_schema),userHandler.register)

// 登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)


module.exports = router