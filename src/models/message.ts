export type messageType = 'TEXT' | 'FILE' | 'IMAGE' | 'GIF'
export interface Sender {
	id: number
	image: string
	username: string
}
export interface LastMessage {
	type: string
	reaction: string
	readMessage: boolean
	_id: string
	sender: string
	room: string
	message: string
}

export interface Message {
	content: string
	conversationId: number
	createdDate: number
	id: number
	sender: Sender
	messageType: messageType
}
