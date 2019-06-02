import {AnyAction} from 'redux'
import {EffectsCommandMap} from 'dva'
export type Effect = (action:AnyAction,effects:EffectsCommandMap)=>void;
import {GlobalModelState} from './global'
import {LoginModelState} from './login'
import {UserModelState} from './user'
export interface ConnectState {
  global:GlobalModelState,
  login:LoginModelState,
  user:UserModelState
}
