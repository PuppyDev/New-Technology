import { AgGridReact } from 'ag-grid-react'
import { FirstDataRenderedEvent, GridOptions } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import styles from './Admin.module.scss'
import { useState } from 'react'

const AdminUsers = () => {
	const [rowData] = useState([
		{ userid: '123', name: 'Celica', test: 35000 },
		{ userid: '1234', name: 'Mondeo', test: 32000 },
		{ userid: '12345', name: 'Boxster', test: 72000 },
	])

	const [columnDefs] = useState([{ field: 'userid' }, { field: 'name' }, { field: 'test' }])

	return (
		<div className="container">
			<h1>User Manager</h1>
			<div className="table">
				<div className="ag-theme-alpine" style={{ height: 400 }}>
					<AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
				</div>
			</div>
		</div>
	)
}
export default AdminUsers
