import request from '../utils/request2'
import {LoginModel} from '@/common/type'
export function login(data:LoginModel){
  return request({
    url:'/login',
    method:'post',
    data
  })
}
