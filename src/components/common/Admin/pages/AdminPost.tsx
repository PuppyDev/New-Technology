import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import styles from './Admin.module.scss'
import { Delete, Edit } from '../ActionBtn'

const AdminPosts = () => {
	const [rowData] = useState([
		{ userid: '123', name: 'Celica', test: 35000, state: 'public', friends: 12 },
		{ userid: '1234', name: 'Mondeo', test: 32000, state: 'public', friends: 12 },
		{ userid: '12345', name: 'Boxster', test: 72000, state: 'public', friends: 12 },
		{ userid: '12', name: 'Celica2', test: 35000, state: 'public', friends: 12 },
		{ userid: '124', name: 'Mondeo2', test: 32000, state: 'public', friends: 12 },
		{ userid: '125', name: 'Boxster2', test: 72000, state: 'public', friends: 12 },
	])

	const [columnDefs] = useState([
		{ field: 'userid' },
		{ field: 'name' },
		{ field: 'test' },
		{ field: 'state' },
		{ field: 'friends' },
		{ field: 'Delete', cellRenderer: Delete },
		{ field: 'Edit', cellRenderer: Edit },
	])

	return (
		<div className="container">
			<h1>Post Manager</h1>
			<div className="table">
				<div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
					<AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
				</div>
			</div>
		</div>
	)
}
export default AdminPosts
