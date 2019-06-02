import request from '../utils/request2'

export function getUserInfo(){
  return request({
    url:'/user',
    method:'get'
  })
}
