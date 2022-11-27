import Admin from '@/components/common/Admin'
import ForgotPassPage from 'pages/auth/forgot/ForgotPassPage'
import HomePage from 'pages/home'
import VideoCallPage from 'pages/videoCall'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const LoginPage = lazy(() => import('../pages/auth/login/LoginPage'))
const VerifyInform = lazy(()=>import('../pages/auth/verifyinform/VerifyInform'))
const Profile = lazy(() => import('pages/profile'))
const ChatConversationPage = lazy(() => import('@/Chat/pages'))
const RegisterPage = lazy(() => import('../pages/auth/register/RegisterPage'))
const PageNotFound = lazy(() => import('../components/layout/PageNotFound/index'))

const mainRoutes = [
	{
		id: 1,
		element: <HomePage />,
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
		id: 6,
		element: <Admin />,
		pathName: '/admin',
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
					<Route path="*" element={<PageNotFound />} />
				</Route>
				<Route
					path="videoCall/:idVideoCall"
					element={
						<PrivateRoute>
							<VideoCallPage />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/auth/verifyAccountSuccess" element={<VerifyInform/>}/>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgotpass" element={<ForgotPassPage />} />
			</Routes>
		</div>
	)
}

export default index
