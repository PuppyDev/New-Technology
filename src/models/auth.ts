export interface RegisterPayLoad {
	email: string
	name: string
	password: string
	username: string
}

export interface LoginPayload {
	email: string
	password: string
	username?: string
}
