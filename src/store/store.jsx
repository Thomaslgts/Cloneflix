import { configureStore } from "@reduxjs/toolkit";
import filmSlice from "./film/filmSlice";
import serieSlice from "./serie/serieSlice";

const store = configureStore({
    reducer: {
        film: filmSlice.reducer,
        serie: serieSlice.reducer,
    },
})

export default store;