import { NOT_AUTHORIZED } from '@/constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'query-string'

const createAxiosInstance = () => {
	const axiosInstance = axios.create({
		baseURL: '/api',
		headers: {
			'Content-Type': 'application/json',
		},
		paramsSerializer: (params) => queryString.stringify(params),
	})

	axiosInstance.interceptors.response.use(
		(response: AxiosResponse) => {
			if (response && response.data) {
				return response.data
			}

			return response
		},
		(error) => {
			if (error.response?.status === NOT_AUTHORIZED) {
				deleteToken()
				showNotify()
			}

			throw error
		}
	)

	axiosInstance.interceptors.request.use(
		function (config: AxiosRequestConfig) {
			// Do something before request is sent
			return config
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error)
		}
	)
	return axiosInstance
}

const deleteToken = () => {
	// return axios.post(`/api/auth/logout`);
}

const showNotify = () => {
	// store.dispatch(setDisableUser(true));
}

export default createAxiosInstance
