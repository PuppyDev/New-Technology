import axiosClient from './axiosClient'
const BASES_URL = 'room'

export const roomApi = {
	getRoomConversation() {
		return axiosClient().get(`${BASES_URL}/`)
	},
}
