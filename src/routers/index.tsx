import ForgotPassPage from 'pages/auth/forgot/ForgotPassPage'
import VideoCallPage from 'pages/videoCall'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'
import Admin from '@/components/common/Admin'
import AdminUsers from '@/components/common/Admin/pages/AdminUser'
import AdminHome from '@/components/common/Admin/pages/AdminHome'
import AdminPost from '@/components/common/Admin/pages/AdminPost'

const LoginPage = lazy(() => import('../pages/auth/login/LoginPage'))
const Profile = lazy(() => import('pages/profile'))
const ChatConversationPage = lazy(() => import('@/Chat/pages'))
const RegisterPage = lazy(() => import('../pages/auth/register/RegisterPage'))

const mainRoutes = [
	{
		id: 1,
		element: 'Main Component',
		pathName: '/',
	},
	{
		id: 2,
		element: <Profile />,
		pathName: '/:_id',
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
		pathName: '/accounts/reset/',
	},
]
const adminRoutes = [
	{
		id: 1,
		element: <AdminHome />,
		pathName: '/admin',
	},
	{
		id: 1,
		element: <AdminUsers />,
		pathName: '/admin/users',
	},
	{
		id: 2,
		element: <AdminPost />,
		pathName: '/admin/posts',
	},
	{
		id: 3,
		element: 'employees',
		pathName: '/admin/employees',
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
				<Route element={<Admin />}>
					{adminRoutes.map((item) => (
						<Route
							path={item.pathName}
							key={item.id}
							element={<PrivateRoute>{item.element}</PrivateRoute>}
						/>
					))}
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgotpass" element={<ForgotPassPage />} />
			</Routes>
		</div>
	)
}

export default index
