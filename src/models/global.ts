import { Subscription } from 'dva';
import { Reducer } from 'redux';
import {Effect} from './connect'
import * as essayService from '@/services/essayService'
export interface GlobalModelState {
  essay:[],
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchEssay: Effect;
  };
  reducers: {
    saveEssay:Reducer<GlobalModelState>
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    essay:[]
  },
  effects: {
    *fetchEssay(_,{call,put,select}){
      const data = yield call(essayService.essay);
      yield put({
        type:'saveEssay',
        payload:data
      })
    },
  },
  reducers: {
    saveEssay(state, { payload }){
      const {data} = payload
      return {
        ...state,
        essay:data.essayList
      }
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof (window as any).ga !== 'undefined') {
          (window as any).ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
