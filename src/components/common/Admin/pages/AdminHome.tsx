import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Image } from 'antd'
import avt from './Admin.png'
const AdminHome = () => {
	return (
		<div className="container">
			<div className="table">
				<div className="ag-theme-alpine" style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
					<Image src={avt} preview={false}></Image>
				</div>
			</div>
		</div>
	)
}
export default AdminHome
