import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "../API/getFilterMovie";
import FilterSliceTV from "../API/getFilterTv";
import FavoriSlice from "./favoris/favorisSlice";
import discoverFilmSlice from "./film/discoverSlice";
import filmSlice from "./film/filmSlice";
import discoverTVSlice from "./serie/discoverSlice";
import serieSlice from "./serie/serieSlice";

const store = configureStore({
    reducer: {
        film: filmSlice.reducer,
        serie: serieSlice.reducer,
        discoverFilm: discoverFilmSlice.reducer,
        genreMovie: FilterSlice.reducer,
        discoverTV: discoverTVSlice.reducer,
        genreTv: FilterSliceTV.reducer,
        favori: FavoriSlice.reducer
    },
})

export default store;