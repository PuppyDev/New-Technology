import { Room } from '@/models/room'
import { LastMessage } from './message'

export interface Friend {
	id: number
	image: string
	username: string
}
export interface Owner {
	id: number
	image: string
	username: string
}

export interface Conversation extends Room {}

export interface ReplyMessage {
	msg: String | null
	replyFor: String | null
	_id: String | null
}
