import { createContext } from 'react'
import { io } from 'socket.io-client'

export const socket = io('', {
	withCredentials: true,
})

export const SocketContext = createContext(socket)
