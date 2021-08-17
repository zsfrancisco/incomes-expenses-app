import {Action, createReducer, on} from "@ngrx/store";
import {setLoading} from "./ui.actions";

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false
}

const _uiReducer = createReducer(
  initialState,
  on(setLoading, (state, {isLoading}) => ({...state, isLoading})),
);

export function uiReducer(state: State | undefined, action: Action) {
  return _uiReducer(state, action)
}
