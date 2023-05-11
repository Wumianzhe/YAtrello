import {configureStore} from '@reduxjs/toolkit'
import authReducer from './API/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
