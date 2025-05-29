
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../models/User';
import { fetchCurrency } from './fetchCurrency';

const myUrl = import.meta.env.VITE_SERVERURL


export const RegisterUser = createAsyncThunk('user/register', async (user: Partial<User>, thunkAPI) => {
    try {
        const response = await axios.post(`${myUrl}/api/user/register`, user)
        console.log("register");
        console.log(response.data);

        // הפעלת login דרך ה-dispatch
        await thunkAPI.dispatch(LoginUser(user));

        return response.data;
    } catch (e) {
        console.log("errorRegister");
        alert("הרשמה נכשלה");
        return thunkAPI.rejectWithValue(e);
    }
});

export const LoginUser = createAsyncThunk('login', async (user: Partial<User>, thunkAPI) => {
    try {
        const response = await axios.post(`${myUrl}/api/user/login`, user)
        console.log("login");
        response.data.IsIn = true;
        alert("התחברות הצליחה")
        return response.data
    } catch (e) {
        console.log("error-login");
        alert("התחברות נכשלה")
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

            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(LoginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = '';
                console.log("LoginUser.fulfilled payload:", action.payload); // הוסף את הלוג הזה
                if (action.payload) {
                    localStorage.setItem('userToken', action.payload.token); // שמור את ה-token ב-localStorage
                    state.user = action.payload.user as User; // עדכן את כל אובייקט המשתמש
                    state.user.isIn = true;
                }
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Recipes'
            })
            .addCase(RegisterUser.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(RegisterUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = '';

                if (action.payload) {
                    localStorage.setItem('userToken', action.payload.token); // שמור את ה-token ב-localStorage
                    state.user = action.payload.user as User; // עדכן את כל אובייקט המשתמש
                    state.user.isIn = true;
                }
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Recipes'
            }
            )

            .addCase(fetchCurrency.fulfilled, (state, action) => {
                if (!state.user.currency) {
                    state.user.currency = { sum: 0, userId: state.user.id.toString() };
                }
                state.user.currency.sum = action.payload;
            })


    }
})



