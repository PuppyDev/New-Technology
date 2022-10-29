import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const KEY = 'CALLVIDEO'
export interface CallVideo {
	isRecive: boolean
}

const initialState: CallVideo = {
	isRecive: false,
}

export const callVideoSlice = createSlice({
	name: 'call_video',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
})

export const {} = callVideoSlice.actions

export default callVideoSlice.reducer
