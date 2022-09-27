const db = require("../db")

// 获取文章分类列表
exports.getArticleCates = (req, res) => {
    const sql = `select * from blog_article_cate where is_delete=0 order by id asc`

    db.query(sql, (err, result) => {
        if (err) return res.send({ status: 1, message: err })

        res.send({
            status: 0,
            message: '获取文章分类列表成功',
            data: result
        })
    })
}

// 添加分类名称
exports.addArticleCates = (req, res) => {
    const sql = `select * from blog_article_cate where name=? or alias=?`

    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.send({ status: 1, message: err })

        // 分类名称和别名被占用
        if (result.length === 2) return res.send({ status: 1, message: '分类名称与别名被占用，请更换后重试！' })
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.send({ status: 1, message: '分类名称与别名被占用，请更换后重试！' })

        // 分类名称或分类别名 被占用
        if (result.length === 1 && result[0].name === req.body.name) return res.send({ status: 1, message: '分类名称被占用，请更换后重试！' })
        if (result.length === 1 && result[0].alias === req.body.alias) return res.send({ status: 1, message: "分类别名被占用，请更换后重试！" })

        const addSql = `insert into blog_article_cate set ?`

        db.query(addSql, req.body, (err, results) => {
            if (err) return res.send({ status: 1, message: err })

            if (results.affectedRows !== 1) return res.send({ status: 1, message: '新增文章分类失败！' })

            res.send({
                status: 0,
                message: '新增文章分类成功！'
            })
        })
    })
}

// 根据id删除文章分类
exports.deleteCateById = (req, res) => {
    const sql = `update blog_article_cate set is_delete = 1  where id=?`

    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.send({ status: 1, message: err })

        if (result.affectedRows !== 1) return res.send({ status: 1, message: '删除分类失败！' })

        res.send({
            status: 1,
            message: '删除分类成功！'
        })
    })
}

// 根据id获取分类信息
exports.getArtCateById = (req, res) => {
    const sql = `select * from  blog_article_cate where id=?`
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.send({ status: 1, message: err })
        if (result.length !== 1) return res.send({ status: 1, message: '获取分类失败！' })
        res.send({
            status: 1,
            message: '获取分类成功！',
            data: result[0]
        })
    })
}

// 根据id更新分类
exports.updateArtCateById = (req, res) => {
    const sql = `select * from blog_article_cate where id=?`

    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.send({ status: 1, message: err })

        // 分类名称和别名被占用
        if (result.length === 2) return res.send({ status: 1, message: '分类名称与别名被占用，请更换后重试！' })
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.send({ status: 1, message: '分类名称与别名被占用，请更换后重试！' })

        // 分类名称或分类别名 被占用
        if (result.length === 1 && result[0].name === req.body.name) return res.send({ status: 1, message: '分类名称被占用，请更换后重试！' })
        if (result.length === 1 && result[0].alias === req.body.alias) return res.send({ status: 1, message: "分类别名被占用，请更换后重试！" })

        const updateSql = `update blog_article_cate set ? where id =?`
        db.query(updateSql, [req.body,req.body.id], (err, result) => {
            if (err) return res.send({ status: 1, message: err })
            if (result.affectedRows !== 1) return res.send({ status: 1, message: '更新分类失败！' })
            res.send({
                status: 1,
                message: '更新分类成功！',
            })
        })
    })
}
