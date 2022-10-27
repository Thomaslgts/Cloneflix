import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "https://api.themoviedb.org/3/"

export const getPopularMovie = createAsyncThunk("film/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${API_URL}/movie/popular`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY
            }
        })
        return data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})

const filmSlice = createSlice({
    name: "film",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getPopularMovie.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getPopularMovie.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getPopularMovie.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});

export default filmSlice;
