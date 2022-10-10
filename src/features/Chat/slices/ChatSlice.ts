import { Conversation } from '@/models/conversation'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const KEY = 'CHAT'
export interface ChatState {}

const initialState: ChatState = {
	conversations: [],
	messageObj: {
		message: [],
		page: 0,
		size: 0,
		totalItem: 0,
		totalPage: 0,
		loading: false,
	},
	isLoading: false,
	conversationSelected: null,
	notifycationObj: {
		isLoading: false,
		notifycations: [],
	},
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<{ conversations: Conversation[] }>) => {
			// state.conversations = action.payload.conversations
		},
	},
	extraReducers: (builder) => {},
})

export const {} = chatSlice.actions

export default chatSlice.reducer
