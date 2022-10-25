const db = require("../db")

exports.getWorksList = (req,res)=>{
    let currentPage = req.body.currentPage;
    let pageSize = req.body.pageSize;
    const sql = `select * from blog_works where is_delete = 0`
    db.query(sql,(err,result)=>{
        if (err) return res.send({ status: 1, message: err });

    if (result.length === 0) {
      res.send({
        status: 1,
        message: "暂时没有作品！",
      });
      return;
    }
    let total = result.length;
    let data = result.splice((currentPage - 1) * pageSize, pageSize);
    res.send({
      status: 0,
      message: "获取作品列表成功！",
      data,
      total,
    });
    })
}

exports.getArticleList= (req,res)=>{
    let currentPage = req.body.currentPage;
    let pageSize = req.body.pageSize;
    const sql = `select * from blog_articles where is_delete = 0`
    db.query(sql,(err,result)=>{
        if (err) return res.send({ status: 1, message: err });

    if (result.length === 0) {
      res.send({
        status: 1,
        message: "暂时没有文章！",
      });
      return;
    }
    let total = result.length;
    let data = result.splice((currentPage - 1) * pageSize, pageSize);
    res.send({
      status: 0,
      message: "获取作品列表文章！",
      data,
      total,
    });
    })
}