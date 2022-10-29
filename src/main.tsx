import 'antd/dist/antd.css'
import { SocketProvider } from 'context/SocketContext'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
// import './assets/styles/index.scss'
import ErrorBoundary from './hoc/ErrorBoundary'
import './locale/i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ErrorBoundary>
		<BrowserRouter>
			<SocketProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</SocketProvider>
		</BrowserRouter>
	</ErrorBoundary>
)
