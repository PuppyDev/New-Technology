import { User } from './user'

export interface NotificationRequest {
	isChecked: boolean
	requestedUserId: string
	type: string
	updatedAt: string
	createdAt: string
	requestUserName: string
	requestAccount: string
	_id: string
	image?: string
	isAccept?: boolean
	accepted?: boolean
}
