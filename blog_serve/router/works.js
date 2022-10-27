const express = require('express')
const router = express.Router()

const works_handler = require('../user_handler/works')

const multer = require('multer')
const path = require('path')

const uploadWorksCover = multer({ dest: path.join(__dirname, '../uploads/works') })

// 添加作品
router.post('/addWorks',uploadWorksCover.single('file'),works_handler.addWorks)

// 删除作品
router.post('/deleteWorks',works_handler.deleteWorks)

// 修改作品
router.post('/updateWorks',uploadWorksCover.single('file'),works_handler.updateWorks)

// 获取作品列表
router.post('/getWorksList',works_handler.getWorksList)

// 获取作品详情
router.post('/getWorksDetail',works_handler.getWorksDetail)

module.exports = router