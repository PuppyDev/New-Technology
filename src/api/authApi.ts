import { LoginPayload, RegisterPayLoad } from '@/models/auth'
import { ResponseObject } from '@/models/index'
import axiosClient from './axiosClient'
const BASE_URL = '/auth'

export const authApi = {
	login(payload: LoginPayload): Promise<ResponseObject<any>> {
		return axiosClient().post(`${BASE_URL}/login`, payload)
	},
	logout() {
		return axiosClient().post(`${BASE_URL}/logout`)
	},
	register(payload: RegisterPayLoad): Promise<ResponseObject<any>> {
		return axiosClient().post(`${BASE_URL}/signup`, payload)
	},
	forgotPassword(email: string): Promise<ResponseObject<any>> {
		return axiosClient().post(`${BASE_URL}/forgot-password`, email)
	},
}
