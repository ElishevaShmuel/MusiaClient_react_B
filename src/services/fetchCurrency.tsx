import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CurrencyState {
  value: number;
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  value: 0,
  loading: false,
  error: null,
};
const myUrl = import.meta.env.VITE_SERVERURL

// שליפה של סכום הקרדיטים לפי userId
export const fetchCurrency = createAsyncThunk(
  'currency/fetch',
  async (userId: number, thunkAPI) => {
    try {
      console.log("fetchCurrency called with userId:", userId);
      const response = await axios.get<number>(`${myUrl}/api/Currency/getSum?userId=${userId}`);
      // console.log("fetchCurrency response:", response.data);
      
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message || 'Failed to fetch currency');
    }
  }
);

// הוספת קרדיטים
export const addCurrency = createAsyncThunk(
  'currency/add',
  async ({ userId, cost }: { userId: number; cost: number }, thunkAPI) => {
    try {
      const response = await axios.post<number>(
        `${myUrl}/api/Currency/addSum?userId=${userId}`,
        cost,
        { headers: { 'Content-Type': 'application/json' } }
      );
        await thunkAPI.dispatch(fetchCurrency(userId)); // עדכון סכום הקרדיטים לאחר ההוספה
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message || 'Failed to add currency');
    }
  }
);

// הורדת קרדיטים
export const subtractCurrency = createAsyncThunk(
  'currency/subtract',
  async ({ userId, cost }: { userId: number; cost: number }, thunkAPI) => {
    try {
      const response = await axios.post<number>(
        `${myUrl}/api/Currency/subSum?userId=${userId}`,
        cost,
        { headers: { 'Content-Type': 'application/json' } }
      );
      await thunkAPI.dispatch(fetchCurrency(userId));
      return response.data;
    } catch (e: any) {
      console.log("Error in subtractCurrency:", e);

      return thunkAPI.rejectWithValue(e.message || 'Failed to subtract currency');
      
    }
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCurrency
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addCurrency
      .addCase(addCurrency.fulfilled, (state, action: PayloadAction<number>) => {
        state.value = action.payload;
      })

      // subtractCurrency
      .addCase(subtractCurrency.fulfilled, (state, action: PayloadAction<number>) => {
        state.value = action.payload;
      });
  },
});

export default currencySlice.reducer;
