import { Conversation, ReplyMessage } from '@/models/conversation'
import { Message } from '@/models/message'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const KEY = 'CHAT'
export interface ChatState {
	conversations: Conversation[]
	messageObj: {
		message: Message[]
		page: number
		size: number
		totalItem: number
		totalPage: number
		loading: boolean
	}
	isLoading: boolean
	conversationSelected: Conversation | null
	replyMessage: ReplyMessage
}

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
	replyMessage: {
		msg: null,
		replyFor: null,
	},
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<{ conversations: Conversation[] }>) => {
			// state.conversations = action.payload.conversations
		},

		setReplyMessage: (state, action: PayloadAction<{ replyMessage: ReplyMessage }>) => {
			state.replyMessage = action.payload.replyMessage
		},
	},
	extraReducers: (builder) => {},
})

export const { setReplyMessage } = chatSlice.actions

export default chatSlice.reducer
