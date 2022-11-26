import { Conversation, ReplyMessage } from '@/models/conversation'
import { Message, pinMessage } from '@/models/message'
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
	openCreateConversation: boolean
	pinMessage: pinMessage[]
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
	openCreateConversation: false,
	pinMessage: [],
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setConversations: (state, action: PayloadAction<{ conversations: Room[] }>) => {
			const conversations = action.payload.conversations

			conversations?.forEach((conversation) => {
				if (!Array.isArray(conversation.users)) conversation.users = [conversation.users]
			})

			state.conversations = conversations
		},

		addConversation: (state, action: PayloadAction<{ conversation: Room }>) => {
			const conversation = action.payload.conversation
			state.conversations?.push(conversation)
		},

		setReplyMessage: (state, action: PayloadAction<{ replyMessage: ReplyMessage }>) => {
			state.replyMessage = action.payload.replyMessage
		},

		setConversationSelected: (state, action: PayloadAction<Conversation | null | undefined>) => {
			state.conversationSelected = action.payload
		},

		setOpenCreateConversation: (state) => {
			state.openCreateConversation = true
		},

		setCloseCreateConversation: (state) => {
			state.openCreateConversation = false
		},

		initChatSlice: (state) => {
			state.conversationSelected = initialState.conversationSelected
			state.conversations = initialState.conversations
			state.messageObj = initialState.messageObj
			state.openCreateConversation = initialState.openCreateConversation
			state.replyMessage = initialState.replyMessage
		},

		setPinMessage(state, action) {
			state.pinMessage = action.payload
		},
	},
	extraReducers: (builder) => {},
})

export const {
	setReplyMessage,
	setConversations,
	setConversationSelected,
	setOpenCreateConversation,
	setCloseCreateConversation,
	initChatSlice,
	addConversation,
	setPinMessage,
} = chatSlice.actions

export default chatSlice.reducer
