// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

const artcate_handler = require('../user_handler/artcate')

const {add_cate_schema,id_cate_schema,updateCate_cate_schema} = require('../schema/article')

// 获取文章分类的列表数据
router.get('/cates',artcate_handler.getArticleCates)

// 增加文章分类
router.post('/addCates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)

// 根据id删除分类
router.post('/deleteCate/:id',expressJoi(id_cate_schema),artcate_handler.deleteCateById)

// 根据id获取文章分类数据
router.post('/cates/:id',expressJoi(id_cate_schema),artcate_handler.getArtCateById)

// 根据id更新文章分类数据
router.post('/updateCate',expressJoi(updateCate_cate_schema),artcate_handler.updateArtCateById)

// 向外共享路由
module.exports = router