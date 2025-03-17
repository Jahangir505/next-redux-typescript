import { combineReducers } from "@reduxjs/toolkit";
import itemReducer from "./itemReducer";

const appReducer = combineReducers({
  itemReducer
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

export default rootReducer;
