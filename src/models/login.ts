import { Effect } from './connect'
import { Reducer } from 'redux';
import * as loginService from '@/services/loginService'

export interface LoginModelState{
  status:{
    isLogin:false,
    token:string
  }
}
export interface ModelType {
  namespace: string,
  state: {}
  effects: {
    logout: Effect,
    login:Effect
  }
  reducers: {
    changeLoginStatus: Reducer<{}>
  },
  subscriptions: {
    setup:any
  },
}

const Model: ModelType = {
  namespace: 'login',
  state: {
    status: {
      isLogin:false,
      token:undefined
    },
  },
  effects: {
    *logout(_,{call,put,select}){
     yield console.log('logout')
    },
    *login({payload},{call,put,select}){
      let {email,password} = payload
      const data = yield call(loginService.login,{email,password});
      if(data.data.code == 200){
        yield window.localStorage.setItem('haopengzh_token',data.data.token)
        yield put({type:'changeLoginStatus',payload:{status:{isLogin:true,token:data.data.token}}})
      }
      yield console.log(data)
    },
  },
  reducers:{
    changeLoginStatus(state,{payload}){
      return {
        ...state,
        status:payload.status
      }
    }
  },
  subscriptions: {
    setup:()=>{}
  },
}
export default Model

