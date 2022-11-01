import { LoginPayload } from './auth'

export interface User {
	_id: string
	username: string
	name: string
	image?: string
	email?: string
}
export interface UserProfile extends User {
	accessToken: string
	refreshToken: string
}

export interface UserInfo extends User {
	friends: User[]
	gender: string
	isFriend: boolean
	posts: any
	addFriendRequest: boolean
}

export interface UserRecive {
	receivedUserId: string
	receivedUsername: string
}

export interface UserRequest {
	requestedUserId: string
	requestedUsername: string
}
