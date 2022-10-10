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

export interface Conversation {
	id: number
	lastMessage: LastMessage
	sourceImage: string
	sourceName: string
	readStatus: boolean
	owner: Owner
	friend: Friend
}
