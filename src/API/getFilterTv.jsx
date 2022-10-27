import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "https://api.themoviedb.org/3/"

export const getFilterTV = createAsyncThunk("getFilterTV/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${API_URL}genre/tv/list`, {
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

const FilterSliceTV = createSlice({
    name: "genre",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getFilterTV.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getFilterTV.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getFilterTV.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});

export default FilterSliceTV;