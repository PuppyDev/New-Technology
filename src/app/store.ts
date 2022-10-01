import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import global from './globalSlice'

export const store = configureStore({
	reducer: {
		global,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
