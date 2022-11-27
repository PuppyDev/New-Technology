import axiosClient from './axiosClient'
const BASES_URL = 'post'

export const postApi = {
	getAllPost(params?: any) {
		return axiosClient().get(`${BASES_URL}/new-feed`, params)
	},
}
