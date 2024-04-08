import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataType, LoginData, User } from "../../types/authTypes";
import axios, { AxiosResponse } from "axios";
import { clearUser, setUser } from "./authSlice";


export const fetchSignUp = createAsyncThunk<User, DataType>('SignUp', async (data: DataType, {dispatch}) => {
    const response = await axios.post<User>(`${import.meta.env.VITE_URL}/reg`, data, {
        withCredentials: true,
    });
    if (response.status === 200) {
      dispatch(setUser(response.data));
  } else {
      throw new Error(response.data.message);
  }
    return response.data
})

export const fetchSignIn = createAsyncThunk<User, LoginData>('SignIn', async (data: LoginData, {dispatch}) => {
  const response = await axios.post<User>(`${import.meta.env.VITE_URL}/log`, data, {
      withCredentials: true,
  })

  if (response.status === 200) {
      dispatch(setUser(response.data));
  } else {
      throw new Error(response.data.message);
  }

  return response.data
})



export const fetchSignOut = createAsyncThunk('SignOut', async (_, {dispatch}) => {
    try {
        const response = await axios.get<AxiosResponse>(`${import.meta.env.VITE_URL}/logout`, {
            withCredentials: true
        })
        dispatch(clearUser());
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
})


export const checkUser = createAsyncThunk<User, DataType>('CheckUser', async (data, {dispatch}) => {
    const response = await axios.get<AxiosResponse>(`${import.meta.env.VITE_URL}/`, {
      withCredentials: true,
    });
    dispatch(setUser(response.data));
    return response.data
  })
  export const fetchUpdateUser = createAsyncThunk<User, User>('UpdateUser', async (newData: User, {dispatch}) => {
    const response = await axios.put<User>(`${import.meta.env.VITE_URL}/update`, newData, {
        withCredentials: true,
    });
    dispatch(setUser(response.data))
    return response.data
})

export const fetchUsers = createAsyncThunk('fetchUsers', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/people`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  
