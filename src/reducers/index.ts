import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import sessionReducer from "./sessionReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  session: sessionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
