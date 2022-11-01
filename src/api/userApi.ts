const BASE_URL = 'user'

import { UserRecive, UserRequest } from '@/models/user'
import axiosClient from './axiosClient'

export const userApi = {
	searchUserByUserName(keyword: string) {
		return axiosClient().get(`${BASE_URL}/search/${keyword}`)
	},

	getMineInfo() {
		return axiosClient().get(`${BASE_URL}/me/profile`)
	},

	getInfoById(idUser: string) {
		return axiosClient().get(`${BASE_URL}/${idUser}`)
	},

	undoRequestFriend(prams: UserRecive) {
		return axiosClient().post(`${BASE_URL}/friends/undo-request`, { ...prams })
	},

	getAllNotification() {
		return axiosClient().get(`${BASE_URL}/notifications/all`)
	},

	acceptRequestFriend(params: UserRequest) {
		return axiosClient().post(`${BASE_URL}/friends/accept-request`, { ...params })
	},

	removeRequestFriend(params: UserRequest) {
		return axiosClient().post(`${BASE_URL}/friends/decline-request`, { ...params })
	},
}
