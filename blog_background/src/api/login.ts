import instance from './http'

// 注册
export function register(data: any) {
  return instance({
    url: "api/register",
    method: 'post',
    data,
  })
}

// 登录
export function login(data: any) {
  return instance({
    url: "api/login",
    method: 'post',
    data,
  })
}