import { combineReducers } from "redux";
import { globalStateReducer } from "./global-stat/slice.js";

const rootReducer = combineReducers({
    globalState: globalStateReducer,
});

export default rootReducer;
