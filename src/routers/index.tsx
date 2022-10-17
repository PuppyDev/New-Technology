import ChatConversationPage from '@/Chat/pages'
import VideoCallPage from 'pages/videoCall'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const Profile = lazy(() => import('pages/profile'))

const mainRoutes = [
	{
		id: 1,
		element: 'Main Component',
		pathName: '/',
	},
	{
		id: 2,
		element: <Profile />,
		pathName: '/:username',
	},
	{
		id: 3,
		element: <ChatConversationPage />,
		pathName: '/direct/inbox',
	},
	{
		id: 6,
		element: <ChatConversationPage />,
		pathName: '/direct/inbox/:inboxId',
	},
	{
		id: 4,
		element: 'Explore Component',
		pathName: '/explore/',
	},
	{
		id: 5,
		element: 'account edit Component',
		pathName: '/accounts/edit/',
	},
]

const index = () => {
	return (
		<div>
			<Routes>
				<Route element={<RenderRouteHeader />}>
					{mainRoutes.map((item) => (
						<Route
							path={item.pathName}
							key={item.id}
							element={<PrivateRoute>{item.element}</PrivateRoute>}
						/>
					))}
					<Route path="*" element={<>Error page</>} />
				</Route>

				<Route
					path="videoCall/:idVideoCall"
					element={
						<PrivateRoute>
							<VideoCallPage />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<>Login page</>} />
				<Route path="/register" element={<>register page</>} />
			</Routes>
		</div>
	)
}

export default index
