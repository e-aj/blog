const db = require("../db");
const fs = require("fs");

// const readFileFun = (cover_img) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(String(cover_img), (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       // var base64Img = `data:image/jpeg;base64,${data.toString("base64")}`;
//       resolve(data);
//     });
//   });
// };

const readFileFun = (cover_img) => { };

exports.getWorksList = (req, res) => {
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  const sql = `select * from blog_works where is_delete = 0`;
  db.query(sql, (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    if (result.length === 0) {
      res.send({
        status: 1,
        message: "暂时没有作品！",
      });
      return;
    }
    result.forEach((item) => {
      fs.readFile(String(item.cover_img), (err, data) => {
        if (err) {
          console.log(err);
        }
        var base64Img = `data:image/jpeg;base64,${data.toString("base64")}`;
        item.cover_img = base64Img;
      });
    });


    setTimeout(() => {
      let total = result.length;
      let data = result.splice((currentPage - 1) * pageSize, pageSize);
      res.send({
        status: 0,
        message: "获取作品列表成功！",
        data,
        total,
      });

    }, 1000)
  }
  );
};

exports.getArticleList = (req, res) => {
  let currentPage = req.body.currentPage;
  let pageSize = req.body.pageSize;
  const sql = `select * from blog_articles where is_delete = 0`;
  db.query(sql, (err, result) => {
    if (err) return res.send({ status: 1, message: err });

    if (result.length === 0) {
      res.send({
        status: 1,
        message: "暂时没有文章！",
      });
      return;
    }

  

    result.forEach((item) => {
      if(item.cover_img){
        fs.readFile(String(item.cover_img), (err, data) => {
          if (err) {
            console.log(err);
          }
          var base64Img = `data:image/jpeg;base64,${data.toString("base64")}`;
          item.cover_img = base64Img;
        });
      }
    });


    setTimeout(() => {
      let total = result.length;
      let data = result.splice((currentPage - 1) * pageSize, pageSize);
      res.send({
        status: 0,
        message: "获取作品列表文章！",
        data,
        total,
      });
  

    }, 1000)




  });
};
