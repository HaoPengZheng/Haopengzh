import * as userService from '../services/essayService'
export default {
  namespace: 'products',
  state: {
    essay:[]
  },
  reducers: {
    login(state,{payload:userinfo}){

    },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    addEssay(state,{payload:{data}}){
      return {
        essay:data
      }
    }
  },
  effects:{
    *essay({payload:{}},{call,put}){
      const {data} = yield call(userService.essay())
      yield put ({type:'addEssay',payload:{data}})
    }
  }
};