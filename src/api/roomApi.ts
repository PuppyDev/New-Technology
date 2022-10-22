import queryString from 'query-string'
import { PayloadMessage } from '../models'
import axiosClient from './axiosClient'
const BASES_URL = 'room'

export const roomApi = {
	getRoomConversation() {
		return axiosClient().get(`${BASES_URL}/`)
	},

	getMessageInRoom({ roomId, nMessage, userId }: PayloadMessage) {
		console.log('Vo')

		return axiosClient().get(`${BASES_URL}/${roomId}?nMessage=${nMessage}&userId=${userId}`)
	},
}
