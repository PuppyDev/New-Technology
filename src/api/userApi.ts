const BASE_URL = 'user'

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

	undoRequestFriend(prams: { receivedUserId: string; receiveUsername: string }) {
		return axiosClient().post(`${BASE_URL}/friends/undo-request`, { ...prams })
	},
}
