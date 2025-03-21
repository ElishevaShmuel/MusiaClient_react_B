import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../services/userFetch";
import { MusicFilesSlice } from "../services/FilesFetch";

const Store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        musicFiles: MusicFilesSlice.reducer
    }
});
export default Store
export type AppDispatch = typeof Store.dispatch;