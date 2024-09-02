import { combineReducers } from "@reduxjs/toolkit";
import hesReducer from "./hes";
import hesApi from "./hes/hesApi";
import veeReducer from "./vee";
import veeApi from "./vee/veeApi";

const rootReducer = combineReducers({
  hes: hesReducer,
  [hesApi.reducerPath]: hesApi.reducer,
  vee: veeReducer,
  [veeApi.reducerPath]: veeApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
