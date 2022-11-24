import React from 'react'
import ListPost from '../components/ListPost'

const Home = () => {
	return (
		<div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ width: '100%', maxWidth: '500px' }}>
				<ListPost />
			</div>
		</div>
	)
}

export default Home
