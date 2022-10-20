import { LastMessage } from './message'
import { User } from './user'

export interface Room {
	_id: string
	users: User[]
	active: string
	messages: LastMessage[]
	group: boolean
	avatar: String
	updatedAt: string
}
