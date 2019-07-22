import { Effect } from './connect'
import { Reducer } from 'redux';
import * as userService from '@/services/userService'
import { string } from 'prop-types';
import store from 'store'

export interface UserModelState{
  email: string,
  facebook: string,
  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string
  },
};

export interface UserModelType{
  namespace: string,
  state: UserModelState
  effects: {
    fetchUserInfo:Effect
  }
  reducers: {
    saveUserInfo: Reducer<UserModelState>
  },
}

const Model: UserModelType = {
  namespace: 'user',
  state: {
    email: "",
    facebook: "",
    profile: {
      name: "",
      gender: "",
      location: "",
      website: "",
      picture: ""
    },
  },
  effects: {
    *fetchUserInfo(_,{call,put,select}){
     let {data} = yield call(userService.getUserInfo)
     console.log(data)
     yield put({type:'saveUserInfo',payload:data.userInfo})
     yield store.set('haopengzh_userInfo',data.userInfo)
    },
  
  },
  reducers:{
    saveUserInfo(state,{payload}){
      console.log(payload)
      return {
        ...state,
        ...payload
      }
    }
  },
}
export default Model

