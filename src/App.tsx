import { Suspense } from 'react'
import Router from './routers'

function App() {
	return (
		<Suspense fallback="Loading...">
			<Router />
		</Suspense>
	)
}

export default App
