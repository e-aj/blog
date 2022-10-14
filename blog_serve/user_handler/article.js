const db = require("../db");
const path = require("path");

// 添加文章
exports.addArticle = (req, res) => {
  // 手动判断是否上传了文章封面
  // if(!req.file || req.file.filedname !== 'cover_img') return res.send({status:0,message:'请上传封面！'})
  const articleInfo = {
    ...req.body,
    // 文章封面在服务器存放路径
    cover_img: req.file ? path.join("../uploads", req.file.filename) : "",
    pub_date: new Date(),
    author_id: req.user.id,
  };

  const sql = `insert into blog_articles set ?`;

  db.query(sql, articleInfo, (err, result) => {
    //    err
    if (err) return res.send(err);

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "发布文章失败！" });

    res.send({ status: 0, message: "发布文章成功！" });
  });
};

// 获取文章
exports.getArticle = (req, res) => {
  const sql = "select * from blog_articles where id=?";
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    //    if(result.length === 0) return res.send({status:1,message:'获取文章失败！'})

    res.send({
      status: 0,
      message: "获取文章成功！",
      data: result,
    });
  });
};

// 获取文章列表
exports.getArticleList = (req, res) => {
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;

  const sql = `select * from blog_articles where is_delete = 0  `;

  db.query(sql, (err, result) => {
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
      message: "获取文章列表成功！",
      data,
      total,
    });
  });
};

// 删除文章
exports.deleteArticle = (req, res) => {
  const sql = `update blog_articles set is_delete = 1  where id=?`;
  db.query(sql, req.body.id, (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    if (result.affectedRows !== 1) {
      return res.send({ status: 1, message: "删除文章失败！" });
    }
    res.send({
      status: 0,
      message: "删除文章成功！",
    });
  });
};

// 修改文章
exports.updateArticle = (req, res) => {
  const articleInfo = {
    ...req.body,
    // 文章封面在服务器存放路径
    cover_img: req.file ? path.join("../uploads", req.file.filename) : "",
    pub_date: new Date(),
    author_id: req.user.id,
  };
  const sql = `update blog_articles set ? where id=?`;
  db.query(sql, [articleInfo, req.body.id], (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "更新文章失败！" });

    res.send({ status: 0, message: "更新文章成功！" });
  });
};
