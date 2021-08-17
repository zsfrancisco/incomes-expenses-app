import {User} from "../models/user.model";
import {Action, createReducer, on} from "@ngrx/store";
import {setUser} from "./auth.actions";

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
}

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, user}))
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}
