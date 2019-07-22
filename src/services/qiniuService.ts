import request from '../utils/request'

export function getQiniuToken(){
  return request({
    url:'/api/qiniu/token',
    method:'get'
  })
}

export function getOWQiniuToken(data:Object){
  return request({
    url:'/api/qiniu/overwriteToken',
    method:'post',
    data
  })
}

export function deleteFile(key:string,token:string){
  return request({
    url:'http://up-z2.qiniup.com/delete'+key,
    method:'post',
    headers:{
      Authorization:`QBox ${token}`
    }
  })
}
