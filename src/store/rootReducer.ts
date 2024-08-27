// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import hesReducer from "./hes";
import hesApi from "./hes/hesApi";

const rootReducer = combineReducers({
  vee: hesReducer,
  [hesApi.reducerPath]: hesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
