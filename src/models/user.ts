import { LoginPayload } from './auth'
export interface UserProfile extends LoginPayload {
	username: string
	_id: string
	accessToken: string
	refreshToken: string
}
