import ChatConversationPage from '@/Chat/pages'
import { MainLayout } from '@/components/layout/MainLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const index = () => {
	// const renderRoute = (component) => {
	// 	return <MainLayout>
	// 		{component}
	// 	</MainLayout>
	// }

	return (
		<>
			<MainLayout>
				<Routes>
					<Route path="/" element={<>Main Component</>} />
					<Route path="/:username" element={<>User Component</>} />
					<Route path="/direct/inbox" element={<ChatConversationPage />} />
					<Route path="/direct/inbox/:inboxId" element={<ChatConversationPage />} />
					<Route path="/explore/" element={<>Explore Page</>} />
					<Route path="/accounts/edit/" element={<>account edit Page</>} />

					<Route path="*" element={<>Error page</>} />
				</Routes>
			</MainLayout>
		</>
	)
}

export default index
