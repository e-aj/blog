const express = require('express')
const router = express.Router()

const article_handler = require('../user_handler/article')

// 发布新文章
router.post('/addArticle',article_handler.addArticle)

// 获取文章
router.post('/getArticle',article_handler.getArticle)

// 获取文章列表
router.post('/getArticleList',article_handler.getArticleList)


// 向外共享路由对象
module.exports = router