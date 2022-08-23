import instance from './http'


// 用户列表
export function userList(data: any) {
    return instance({
      url: "api/register",
      method: 'post',
      data,
    })
  }