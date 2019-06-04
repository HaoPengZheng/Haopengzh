import request from '../utils/request'
export function feed(){
  return request({
    url:'/api/feed',
    method:'get'
  })
}
export function getEssay(){
  return request({
    url:'/api/essay',
    method:'get'
  })
}

export function getEssayById(id:string){
  return request({
    url:`/api/essay/${id}`,
    method:'get'
  })
}

export function postEssay(data:any){
  return request({
    url:'/api/essay',
    method:'post',
    data:data
  })
}
