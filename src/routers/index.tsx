import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const mainRoutes = [
	{
		id: 1,
		element: 'Main Component',
		pathName: '/',
	},
	{
		id: 2,
		element: 'User Component',
		pathName: '/:username',
	},
	{
		id: 3,
		element: 'Inbox Component',
		pathName: '/direct/inbox',
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

				<Route path="/login" element={<>Login page</>} />
				<Route path="/register" element={<>register page</>} />
			</Routes>
		</div>
	)
}

export default index
