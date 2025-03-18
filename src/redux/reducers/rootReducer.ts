import { combineReducers } from "@reduxjs/toolkit";
import postReducer from "./postReducer";

const appReducer = combineReducers({
  postReducer
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

export default rootReducer;
