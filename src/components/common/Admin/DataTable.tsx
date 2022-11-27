import { AgGridReact } from 'ag-grid-react'
import { FirstDataRenderedEvent, GridOptions } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import styles from './Admin.module.scss'
import { useState } from 'react'

const DataTable = () => {
	const [rowData] = useState([
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 72000 },
	])

	const [columnDefs] = useState([{ field: 'make' }, { field: 'model' }, { field: 'price' }])

	return (
		<div className="cars-container">
			<div className="cars-table">
				<div className="ag-theme-alpine" style={{ height: 400 }}>
					<AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
				</div>
			</div>
		</div>
	)
}
export default DataTable
