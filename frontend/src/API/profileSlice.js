import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ProfileService from './ProfileService'

const PS = new ProfileService

export const createProfile = createAsyncThunk('profile/create', async ({username,pass,email}) => {
  const registerPayload = {
    username: username,
    password: pass,
    email: email
  }
  const response = await PS.createProfile(registerPayload)
  return response.data;
})

export const fetchBoards = createAsyncThunk('profile/boards', async ({ id }) => {
  const response = await PS.getBoards(id);
  return { id: id, boards: response }
})

export const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    cached: null
  },
  reducers: {
    update: (state, action) => {
      const payload = action.payload
      state.cached[payload.id].assign(state.cached[payload.id], payload)
      PS.updateProfile(payload)
    },
    deleteProfile: (state, action) => {
      const payload = action.payload
      delete state.cached[payload]
      PS.deleteProfile(payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.fulfilled, (state, action) => {
        state.cached[action.payload.id] = action.payload;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        const payload = action.payload
        state.cached[payload.id].boards = payload.boards
      })
  }
})

export const { update, deleteProfile } = profileSlice.actions;
export default profileSlice.reducer
