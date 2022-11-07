import instance from "./http";

export function getArticleList(data:any) {
    return instance({
        url:'api/getArticleList',
        data,
        method:'post'
    })
    
}


export function getWorksList() {
    return instance({
        url:'api/getWorksList',
        method:'post'
    })
    
}