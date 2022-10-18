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
			<Router />
		</Suspense>
	)
}

export default App
