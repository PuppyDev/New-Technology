import { LoginPayload } from './auth'

export interface User {
	_id: string
	username: string
	name: string
	image?: string
}
export interface UserProfile extends User {
	accessToken: string
	refreshToken: string
}
