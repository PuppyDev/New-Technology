import { PayloadMessage } from '../models'
import axiosClient from './axiosClient'
const BASES_URL = 'room'

export const roomApi = {
	getRoomConversation() {
		return axiosClient().get(`${BASES_URL}/`)
	},

	getMessageInRoom({ roomId, nMessage, userId }: PayloadMessage) {
		return axiosClient().get(`${BASES_URL}/${roomId}?nMessage=${nMessage}&userId=${userId}`)
	},
}
