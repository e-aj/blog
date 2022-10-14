import instance from './http'

// 获取文章列表
export function getArticleList(data:any){
    return instance({
        url:'my/getArticleList',
        method:'post',
        data,
    })
}

// 添加文章
export function addArticle(formData:any){
    return instance({
        url:'my/addArticle',
        method:'post',
        data:formData,
        headers:{
            'Content-Type': 'multipart/form-data',
        },
    })
}

// 获取文章详情
export  function getArticle(id:any){
    return instance({
        url:'my/getArticle',
        method:'post',
        data:id
    })
}

// 删除文章
export function deleteArticle(id:number){
    return instance({
        url:'my/deleteArticle',
        method:'post',
        data:{"id":id}
    })
}

// 修改文章
export function updateArticle(formData:any){
    return instance({
        url:'my/updateArticle',
        method:'post',
        data:formData,
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
}