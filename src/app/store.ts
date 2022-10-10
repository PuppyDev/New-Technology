import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import chatSlice from './../features/Chat/slices/ChatSlice'

import global from './globalSlice'

export const store = configureStore({
	reducer: {
		global,
		chatSlice,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
