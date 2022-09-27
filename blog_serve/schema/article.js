const joi = require('joi')

// 定义 分类名称 和分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

// 校验规则对象 --添加分类
exports.add_cate_schema = {
    body:{
        name,
        alias
    }
}

// id schema
exports.id_cate_schema = {
    params:{
        id
    }
}

exports.updateCate_cate_schema = {
    body:{
        id,
        name,
        alias

    }
}