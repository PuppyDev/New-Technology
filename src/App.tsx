import { RoomProvider } from 'context/RoomContext'
import { socket, SocketContext } from 'context/SocketContext'
import { setUser } from 'pages/auth/authSlice'
import { Suspense, useEffect } from 'react'
import { useAppDispatch } from './app/hook'
import Router from './routers'
function App() {
	const dispatch = useAppDispatch()

	// Login From Local
	useEffect(() => {
		const loginData = localStorage.getItem('loginData')
		if (loginData) {
			const data = JSON.parse(loginData)
			dispatch(setUser({ ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }))
		}
	}, [])

	return (
		<Suspense fallback="Loading...">
			<RoomProvider>
				<Router />
			</RoomProvider>
		</Suspense>
	)
}

export default App
