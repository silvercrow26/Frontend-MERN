import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { eventosSlice } from "./eventos/eventosSlice";
import { uiSlice } from "./ui/uiSlice";


export const store = configureStore({
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

    reducer: {
        auth: authSlice.reducer,
        eventos: eventosSlice.reducer,
        ui: uiSlice.reducer,
    }
})