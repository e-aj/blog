const db = require("../db/index");

// 导入密码处理
const bcrypt = require('bcryptjs')

// 获取信息
exports.getUserinfo = (req, res) => {
  const sql = `select id,username,avatar from blog_user where id=?`;
  db.query(sql, req.user.id, (err, result) => {
    if (err) return res.send({ status: 1, message: err.message });

    if (result.length !== 1)
      return res.send({ status: 1, message: "获取用户信息失败！" });

    res.send({
      status: 1,
      message: "获取用户信息成功！",
      data: result[0],
    });
  });
};

// 更新用户信息
exports.postUserinfo = (req, res) => {
  const sql = `update blog_user set ? where id=?`;

  db.query(sql, [req.body, req.body.id], (err, result) => {
    if (err) return res.send({ status: 1, message: err.message });

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "修改用户信息失败！" });

    // 成功
    res.send({ status: 0, message: "修改用户信息成功！" });
  });
};

// 重置密码
exports.updatePassword = (req, res) => {
  const sql = `select * from blog_user where id=?`;

  db.query(sql, req.user.id, (err, result) => {

    if (err) return res.send({ status: 1, message: err.message });

    if (result.length !== 1) return res.send({ status: 1, message: "用户不存在！" });

    // 判断提交的旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
    if (!compareResult) return res.send({ status: 1, message: "原密码错误！" })

    if(req.body.oldPwd === req.body.newPwd) return res.send({status:1,message:'新旧密码相同！'})

    const changeSql = `update blog_user set password=? where id=?`;

    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
  
    // 执行 SQL 语句，根据 id 更新用户的密码
    db.query(changeSql, [newPwd, req.user.id], (err, results) => {
      // SQL 语句执行失败
      if (err) return res.send({ status: 1, message: err.message });
  
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.send({ status: 1, message: '更新密码失败！' })
  
      // 更新密码成功
      res.send({ status: 0, message: '更新密码成功！' })
    });

  });
};

// 更换用户头像
exports.updateAvatar = (req,res)=>{
  const sql = `update blog_user set avatar=? where id=?`

  db.query(sql,[req.body.avatar,req.user.id],(err,result) =>{

    if(err) return res.send({status:1,message:err.message})

    if(result.affectedRows !==1) return res.send({status:1,message:'更新头像失败'})

    res.send({
      status:0,
      message:'更新成功！',
    })
  })

}

// 获取用户列表
exports.getUserList = (req,res)=>{
  const sql = `select id,username,avatar from blog_user`
  db.query(sql,(err,result)=>{
    if(err) return res.send({status:1,message:err.message})
    res.send({
      status:0,
      message:'获取用户列表成功！',
      result
    })
  })
}