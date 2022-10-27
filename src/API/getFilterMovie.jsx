import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "https://api.themoviedb.org/3/"

export const getFilter = createAsyncThunk("getFilter/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${API_URL}/genre/movie/list`, {
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

const FilterSlice = createSlice({
    name: "genre",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getFilter.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getFilter.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getFilter.rejected]: (state, { payload }) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },
});

export default FilterSlice;