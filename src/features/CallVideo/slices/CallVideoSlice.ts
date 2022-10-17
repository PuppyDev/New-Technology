import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const KEY = 'CALLVIDEO'
export interface CallVideo {}

const initialState: CallVideo = {}

export const chatSlice = createSlice({
	name: 'call_video',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
})

export const {} = chatSlice.actions

export default chatSlice.reducer
