import request from '../utils/request'
import {LoginModel} from '@/common/type'
export function login(data:LoginModel){
  return request({
    url:'/api/login',
    method:'post',
    data
  })
}
