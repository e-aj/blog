const express = require('express')
const router = express.Router()

const web_handels = require('../user_handler/webShow')

// 获取作品列表
router.post('/getWorksList',web_handels.getWorksList)

// 获取文章列表
router.post('/getArticleList',web_handels.getArticleList)



// 向外共享路由对象
module.exports = router