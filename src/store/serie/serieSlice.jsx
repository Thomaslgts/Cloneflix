import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "https://api.themoviedb.org/3/"

export const getPopularTv = createAsyncThunk("serie/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${API_URL}/tv/popular`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY
            }
        })
        return data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})

const serieSlice = createSlice({
    name: "serie",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getPopularTv.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getPopularTv.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getPopularTv.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});

export default serieSlice;