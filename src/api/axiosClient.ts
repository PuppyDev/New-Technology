import { NOT_AUTHORIZED } from '@/constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'query-string'

const createAxiosInstance = () => {
	const axiosInstance = axios.create({
		baseURL: 'http://localhost:3000/v1',
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
			console.log('🚀 ~ file: axiosClient.ts ~ line 23 ~ createAxiosInstance ~ error', error)
			if (error.response?.status === NOT_AUTHORIZED) {
				console.log('Vo not authorized')

				showNotify()
				deleteToken()
			}

			throw error
		}
	)

	axiosInstance.interceptors.request.use(
		function (config: AxiosRequestConfig) {
			// Do something before request is sent

			// mouted access token in header
			const loginData = localStorage.getItem('loginData')
			if (loginData) {
				const data = JSON.parse(loginData)
				config.headers = {
					...config.headers,
					Authorization: data.accessToken,
				}
			}

			return config
		},
		function (error) {
			console.log('🚀 ~ file: axiosClient.ts ~ line 58 ~ createAxiosInstance ~ error', error)
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
