import { configureStore } from "@reduxjs/toolkit";
import main_api from "./api";

export const store = configureStore({
  reducer: {
    [main_api.reducerPath]: main_api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([main_api.middleware]),
});
