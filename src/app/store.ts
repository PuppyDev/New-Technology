import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import chatSlice from './../features/Chat/slices/ChatSlice'
import authSlice from './../pages/auth/authSlice'
import callVideoSlice from './../features/CallVideo/slices/CallVideoSlice'
import global from './globalSlice'

export const store = configureStore({
	reducer: {
		global,
		chatSlice,
		authSlice,
		callVideoSlice,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
