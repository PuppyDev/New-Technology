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
	conversationSelected: Room | null | undefined
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
	conversationSelected: null,
	replyMessage: {
		msg: null,
		replyFor: null,
		_id: null,
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

		setConversationSelected: (state, action: PayloadAction<Conversation | null | undefined>) => {
			state.conversationSelected = action.payload
		},
	},
	extraReducers: (builder) => {},
})

export const { setReplyMessage, setConversations, setConversationSelected } = chatSlice.actions

export default chatSlice.reducer
