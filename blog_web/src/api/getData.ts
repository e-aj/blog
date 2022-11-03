import instance from "./http";

export function getArticleList(data:any) {
    return instance({
        url:'api/getArticleList',
        data,
        method:'post'
    })
    
}


export function getWorksList(data:any) {
    return instance({
        url:'api/getWorksList',
        data,
        method:'post'
    })
    
}