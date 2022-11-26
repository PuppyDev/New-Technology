import { Modal, notification } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { setUser } from 'pages/auth/authSlice'
import { Suspense, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hook'
import LoadingFallBack from './components/common/LoadingFallBack'
import Router from './routers'

function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const socket = useContext(SocketContext)
	const user = useAppSelector((state) => state.authSlice.user)

	// Login From Local
	useEffect(() => {
		const loginData = localStorage.getItem('loginData')
		if (loginData) {
			const data = JSON.parse(loginData)
			dispatch(setUser({ ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }))
		}
	}, [])

	useEffect(() => {
		if (socket && user?._id)
			socket.on('chat:new_call', (dataGot) => {
				if (dataGot.userId === user?._id) {
					const modal = Modal.warning({
						title: 'Có người gọi tới ....',
						onOk() {
							navigate(`/videoCall/${dataGot.roomId}`)
						},

						onCancel() {
							socket.emit('chat:call_decline', (dataGot: any) => {
								console.log('🚀 ~ file: App.tsx ~ line 41 ~ socket.emit ~ dataGot', dataGot)
							})
						},
						centered: true,
					})
				}
			})
	}, [user?._id])

	return (
		<Suspense fallback={<LoadingFallBack />}>
			<Router />
		</Suspense>
	)
}

export default App
