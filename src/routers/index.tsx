import React from 'react'
import { Route, Routes } from 'react-router-dom'

const index = () => {
	return (
		<Routes>
			<Route path="/" element={<>Main Component</>} />
			<Route path="/:username" element={<>User Component</>} />
			<Route path="/direct/inbox" element={<>Inbox Page</>} />
			<Route path="/explore/" element={<>Explore Page</>} />
			<Route path="/accounts/edit/" element={<>account edit Page</>} />

			<Route path="*" element={<>Error page</>} />
		</Routes>
	)
}

export default index
