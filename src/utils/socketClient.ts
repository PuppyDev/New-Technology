import { useAppSelector } from './../app/hook'
import io from 'socket.io-client'

export let socket: any

export function init() {
	socket = io('http://localhost:3000', {
		transports: ['websocket'],
	})
}
