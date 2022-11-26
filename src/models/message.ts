export type messageType = 'TEXT' | 'FILE' | 'IMAGE' | 'GIF' | 'VIDEO' | 'NOTIFY'
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
	message: string
	room: number
	createdDate: number
	_id: number
	sender: string
	type: messageType
	reaction: string
	isDeleted?: boolean
}

export interface PayloadMessage {
	roomId: string
	nMessage: number
	userId: string
}

export interface pinMessage {
	message: string
	room: string //Id of Room,
	_id: string //Id of Pin Message
	type: string
}

export interface DataPinUpdate {
	messagePin: pinMessage
	type: 'DELETE' | 'ADD'
}
