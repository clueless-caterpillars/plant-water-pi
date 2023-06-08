import { combineReducers } from "@reduxjs/toolkit";
import plantsSlice from "./plantsSlice";


const mainReducer = combineReducers({
  plants: plantsSlice.reducer,
})

export default mainReducer;