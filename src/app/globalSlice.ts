import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {}

export const globalSice = createSlice({
	name: 'global',
	initialState,
	reducers: {},
})

export default globalSice.reducer
