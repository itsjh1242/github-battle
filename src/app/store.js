import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import battleReducer from "../features/battle/battleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    battle: battleReducer,
  },
});
