import { PayloadMessage } from '../models'
import axiosClient from './axiosClient'
const BASES_URL = 'message'

export const messageApi = {
	uploadFile(params: any) {
		return axiosClient().post(`${BASES_URL}/addFile`, params)
	},
}
