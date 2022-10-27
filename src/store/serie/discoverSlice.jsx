import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "https://api.themoviedb.org/3/"

export const getDiscoverTV = createAsyncThunk("discoverTV/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${API_URL}discover/tv`, {
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

const discoverTVSlice = createSlice({
    name: "discoverTv",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
        type: "tv"
    },
    reducers: {},
    extraReducers: {
        [getDiscoverTV.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getDiscoverTV.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getDiscoverTV.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});

export default discoverTVSlice;