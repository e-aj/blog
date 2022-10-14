const express = require('express')
const router = express.Router()

const article_handler = require('../user_handler/article')

// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 发布新文章
router.post('/addArticle',upload.single('file'),article_handler.addArticle)

// 获取文章
router.post('/getArticle',article_handler.getArticle)

// 获取文章列表
router.post('/getArticleList',article_handler.getArticleList)

// 删除文章
router.post('/deleteArticle',article_handler.deleteArticle)

// 修改文章
router.post('/updateArticle',upload.single('file'),article_handler.updateArticle)


// 向外共享路由对象
module.exports = router