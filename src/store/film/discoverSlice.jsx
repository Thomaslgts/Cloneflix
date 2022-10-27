import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "https://api.themoviedb.org/3/"

export const getDiscoverMovie = createAsyncThunk("discoverFilm/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${API_URL}discover/movie`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                page: 40
            }
        })
        return data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})

const discoverFilmSlice = createSlice({
    name: "discoverFilm",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
        type: "film"
    },
    reducers: {},
    extraReducers: {
        [getDiscoverMovie.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getDiscoverMovie.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getDiscoverMovie.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});

export default discoverFilmSlice;