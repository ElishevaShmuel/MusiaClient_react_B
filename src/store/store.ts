import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../services/userFetch";

const Store = configureStore({
    reducer: {
        user: UserSlice.reducer,
    }
});
export default Store
export type AppDispatch = typeof Store.dispatch;