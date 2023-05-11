import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { handleLogin, setAuthToken, } from './Auth'

export const login = createAsyncThunk('auth/login', async ({username, pass}) => {
  const loginPayload = {
    username: username,
    password: pass
  }
  const response = await handleLogin(loginPayload);
  return response;
})

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: JSON.parse(localStorage.getItem("auth")),
    error: null
  },
  reducers: {
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem("auth");
      setAuthToken(null)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload))
    })
  }
})

export const { logout } = authSlice.actions
export const selectToken = (state) => state.auth.token

export default authSlice.reducer
