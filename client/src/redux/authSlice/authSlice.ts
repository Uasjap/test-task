import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../types/authTypes"
import { fetchSignUp, fetchSignIn, fetchSignOut, fetchUpdateUser, fetchUsers } from "./authThunkActions"



const initialState = {
    user: {},
    login: '',
    isLoading: true,
    users: []
}

const authSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload.user
            state.login = action.payload.user.login
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.user = {}
            state.login = ''
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload.user
            state.login = action.payload.user.login
            state.isLoading = false;
        })
        .addCase(fetchSignUp.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload.user
            state.login = action.payload.user.login
            state.isLoading = false
        })
        .addCase(fetchSignIn.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchSignOut.fulfilled, (state) => {
            state.user = {}
            state.isLoading = false
        }) 
        .addCase(fetchSignOut.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchUpdateUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload.user
            state.login = action.payload.user.login
            state.isLoading = false;
        })
        .addCase(fetchUpdateUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
          })
        }
    })

    export const {setUser, clearUser} = authSlice.actions
    export default authSlice.reducer