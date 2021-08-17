import {createAction, props} from "@ngrx/store";

export const setLoading = createAction(
  '[UI Component] Set loading',
  props<{ isLoading: boolean }>()
);
