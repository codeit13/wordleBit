import { combineReducers } from "redux";
import wordleState from "./wordleState";

export const rootReducer = () =>
  combineReducers({
    wordleState,
  });
