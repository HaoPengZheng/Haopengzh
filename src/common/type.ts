import { Dispatch } from "redux";
import { History } from "history";

interface CounterModel {
  number: number;
}

export interface LoginModel{
  email:string,
  password:string
}

interface UserModel {
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

export interface GlobalState {
  counter: CounterModel;
  userInfo:UserModel
}

export interface UmiComponentProps {
  history: History;
  dispatch: Dispatch<any>;
}
