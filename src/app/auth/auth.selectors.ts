import {AppState} from "../app.reducer";
import {createSelector} from "@ngrx/store";

export const selectAuth = (state: AppState) => state.auth
export const selectUser = createSelector(selectAuth, auth => auth.user);
