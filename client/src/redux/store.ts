import { configureStore } from "@reduxjs/toolkit";
import type { ConfigureStoreOptions } from "@reduxjs/toolkit";
import authSlice from './authSlice/authSlice'
import type {AuthSliceType} from '../types/authTypes'

type PreloadState = {
    authSlice: AuthSliceType;
}

const storeOptions: ConfigureStoreOptions<PreloadState> ={
    reducer: {
        authSlice,
    },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;