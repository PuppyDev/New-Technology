import { Conversation, ReplyMessage } from '@/models/conversation'
import { Message } from '@/models/message'
import { Room } from '@/models/room'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const KEY = 'CHAT'
export interface ChatState {
	conversations: Room[] | null
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
	conversations: null,
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
		setConversations: (state, action: PayloadAction<{ conversations: Room[] }>) => {
			const conversations = action.payload.conversations
			conversations.forEach((conversation) => {
				if (!Array.isArray(conversation.users)) conversation.users = [conversation.users]
			})

			state.conversations = conversations
		},

		setReplyMessage: (state, action: PayloadAction<{ replyMessage: ReplyMessage }>) => {
			state.replyMessage = action.payload.replyMessage
		},
	},
	extraReducers: (builder) => {},
})

export const { setReplyMessage, setConversations } = chatSlice.actions

export default chatSlice.reducer
