import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socket = io('http://localhost:3000', {
		extraHeaders: {
			Authorization: JSON.parse(localStorage.getItem('loginData') || '{}')?.accessToken || '',
		},
	})

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
