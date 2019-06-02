import request from '../utils/request2'

export function feed(){
  return request({
    url:'/feed',
    method:'get'
  })
}
export function essay(){
  return request({
    url:'/essay',
    method:'get'
  })
}
