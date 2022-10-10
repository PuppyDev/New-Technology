export type messageType = 'TEXT' | 'FILE'
export interface Sender {
	id: number
	image: string
	username: string
}
export interface LastMessage {
	content: string
	conversationId: number
	createdDate: number
	id: number
	sender: null | Sender
	messageType: messageType
}

export interface Message {
	content: string
	conversationId: number
	createdDate: number
	id: number
	sender: Sender
	messageType: messageType
}
