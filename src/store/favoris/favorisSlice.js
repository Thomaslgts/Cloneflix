import { createSlice } from "@reduxjs/toolkit";

export const FavoriSlice = createSlice({
    name: "favori",
    initialState: {
        favori: [],
    },
    reducers: {
        getFavori: (state, { payload }) => {
            state.favori = payload;
        },
        addFavori: (state, { payload }) => {
            state.favori.push(payload)
        }
    }
})

export default FavoriSlice;
export const { getFavori, addFavori } = FavoriSlice.actions