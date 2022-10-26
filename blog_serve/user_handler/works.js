const db = require('../db')
const path = require('path')
const fs = require('fs')
const fullZero = (num) => {
  num = num.toString()
  return num[1] ? num : '0' + num
}

// 添加作品
exports.addWorks = (req, res) => {
  const date = new Date()
  let nowDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${fullZero(date.getHours())}:${fullZero(date.getMinutes())}:${fullZero(date.getSeconds())}`
  // 手动判断是否上传了文章封面
  // if(!req.file || req.file.filedname !== 'cover_img') return res.send({status:0,message:'请上传封面！'})
  const worksInfo = {
    ...req.body,
    // 文章封面在服务器存放路径
    cover_img: req.file ? path.join("./uploads/works", req.file.filename) : "",
    pub_date: nowDate,
    last_date: nowDate,
    author_id: req.user.id,
  };

  const sql = `insert into blog_works set ?`

  db.query(sql, worksInfo, (err, result) => {
    if (err) return res.send(err);

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "添加作品失败！" });

    res.send({ status: 0, message: "添加成功！" });
  })
}

// 删除作品
exports.deleteWorks = (req, res) => {
  const sql = 'update blog_works set is_delete = 1 where id=?'
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    if (result.affectedRows !== 1) {
      return res.send({ status: 1, message: "删除作品失败！" });
    }
    res.send({
      status: 0,
      message: "删除作品成功！",
    });
  })
}

// 修改作品
exports.updateWorks = (req, res) => {
  const date = new Date()
  let nowDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${fullZero(date.getHours())}:${fullZero(date.getMinutes())}:${fullZero(date.getSeconds())}`
  // 手动判断是否上传了文章封面
  // if(!req.file || req.file.filedname !== 'cover_img') return res.send({status:0,message:'请上传封面！'})
  const worksInfo = {
    ...req.body,
    // 文章封面在服务器存放路径
    cover_img: req.file ? path.join("./uploads/works", req.file.filename) : "",
    last_date: nowDate,
    author_id: req.user.id,
  };

  const sql = `update  blog_works set ?  where id=?`
  db.query(sql, [worksInfo, req.body.id], (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "更新作品失败！" });

    res.send({ status: 0, message: "更新作品成功！" });
  })

}

// 获取作品列表
exports.getWorksList = (req, res) => {
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  const sql = `select * from blog_works where is_delete = 0`
  db.query(sql, (err, result) => {
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