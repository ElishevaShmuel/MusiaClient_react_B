
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MusicFile } from '../models/MusicFile';

export const GetFiles = createAsyncThunk('MusicFiles/get', async (_, thunkAPI) => {
    try {
        const response = await axios.get("API_URL")
        console.log("get");
        console.log(response.data);

        return response.data as MusicFile[]

    } catch (e) {
        console.log("errorGet");

        return thunkAPI.rejectWithValue(e)
    }
})

export const GetFilesByUserId = createAsyncThunk('MusicFiles/:id/get', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`url`)
        console.log("getById");

        return response.data as MusicFile[]
    } catch (e) {
        console.log("errorPost");

        return thunkAPI.rejectWithValue(e);
    }
})

export const MusicFilesSlice = createSlice({
    name: 'MusicFiles',
    initialState: {
        MusicFiles: [] as MusicFile[],
        loading: false,
        error: ' '
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(GetFiles.pending, (state) => {
                state.loading = true;
                state.error = ''
                console.log("111");

            })
            .addCase(GetFiles.fulfilled, (state, action: PayloadAction<MusicFile[]>) => {
                state.MusicFiles = action.payload
                console.log("222");
            })
            .addCase(GetFiles.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Files'
                console.log("333");

            })
            .addCase(GetFilesByUserId.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(GetFilesByUserId.fulfilled, (state, action: PayloadAction<MusicFile[]>) => {
                state.loading = false;
                state.error = ''
            })
            .addCase(GetFilesByUserId.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch files'
            })
    }
})



