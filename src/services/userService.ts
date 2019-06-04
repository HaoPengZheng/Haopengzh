import request from '../utils/request'

export function getUserInfo(){
  return request({
    url:'/api/user',
    method:'get'
  })
}
