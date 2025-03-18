
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../models/user';

export const Register = createAsyncThunk('register', async (_, thunkAPI) => {
    try {
        const response = await axios.get("url")
        console.log("register");
        console.log(response.data);

        return response.data as User;

    } catch (e) {
        console.log("errorRegister");

        return thunkAPI.rejectWithValue(e)
    }
})

export const Login = createAsyncThunk('login', async (user: User, thunkAPI) => {
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
            .addCase(Register.pending, (state) => {
                state.loading = true;
                state.error = ''
                console.log("111");

            })
            .addCase(Register.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                console.log("222");
            })
            .addCase(Register.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch user'
                console.log("333");

            })
            .addCase(Login.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(Login.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.error = ''
                if (action.payload) { // בדוק אם payload הוא לא null
                    state.user = action.payload
                    state.user.IsIn=true;  // הוספתי כדי שהמשתמש יהיה מחובר              
                }
            })
            .addCase(Login.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Recipes'
            })
    }
})



