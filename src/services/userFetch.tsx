
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../models/User';

export const RegisterUser = createAsyncThunk('user/register', async (user:User, thunkAPI) => {
    try {
        const response = await axios.post("url",user)
        console.log("register");
        console.log(response.data);

        return response.data as User;

    } catch (e) {
        console.log("errorRegister");

        return thunkAPI.rejectWithValue(e)
    }
})

export const LoginUser = createAsyncThunk('login', async (user: User, thunkAPI) => {
    try {
        const response = await axios.post(`url`, user)
        console.log("login");

        return response.data
    } catch (e) {
        console.log("error-login");

        return thunkAPI.rejectWithValue(e);
    }
})

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as User,
        loading: false,
        error: ' '
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(RegisterUser.pending, (state) => {
                state.loading = true;
                state.error = ''
                console.log("111");

            })
            .addCase(RegisterUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                console.log("222");
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch user'
                console.log("333");

            })
            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(LoginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.error = ''
                if (action.payload) { // בדוק אם payload הוא לא null
                    state.user = action.payload
                    state.user.IsIn=true;  // הוספתי כדי שהמשתמש יהיה מחובר              
                }
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Recipes'
            })
    }
})



