import instance from './http'

// 获取文章列表
export function getArticleListApi(data:any,formData:any){
    console.log(formData)
    return instance({
        url:'my/getArticleList',
        method:'post',
        data:{
            formData,
            data
        }   
        ,
        headers:{
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq'
        },

    })
}

// 添加文章
export function addArticle(data:any){
    return instance({
        url:'my/addArticle',
        method:'post',
        data
    })
}

// 获取文章详情
export  function getArticle(id:number){
    return instance({
        url:'my/getArticle',
        method:'post',
        data:id
    })
}