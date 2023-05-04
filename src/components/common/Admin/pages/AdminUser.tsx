import { useAppSelector } from '@/app/hook'
import { User } from '@/models/user'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridReact } from 'ag-grid-react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Delete, Edit } from '../ActionBtn'
import styles from '../Admin.module.scss'

interface UserData extends User {
	createdAt: string
	numberOfPosts: number
	numberOfFriends: number
}

const AdminUsers = () => {
	const [rowData, setRowData] = useState([])

	const columnDefs = [
		{ field: 'username', size: 1 },
		{ field: 'email', size: 1 },
		{ field: 'createdAt', size: 1 },
		{ field: 'numberOfPosts', size: 1 },
		{ field: 'numberOfFriends', size: 1 },
		{ field: 'Delete', cellRenderer: Delete, size: 1 },
		{ field: 'Edit', cellRenderer: Edit, size: 1 },
	]

	const user = useAppSelector((state) => state.authSlice.user)

	useEffect(() => {
		if (!user) return

		axios
			.get('http://localhost:7071/v1/users?numberRowPerPage=10&pageNumber=1&sortBy=username&order=asc', {
				headers: {
					Authorization: user?.accessToken || '',
				},
			})
			.then((res) => {
				setRowData(res.data.data.users)
			})
			.catch((err) => {
				console.log('🚀 ~ file: AdminUser.tsx ~ line 46 ~ .then ~ err', err)
			})
	}, [user])

	return (
		<div>
			<h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>User Manager</h2>

			<div className={styles.userTable}>
				<div className="ag-theme-alpine" style={{ height: '80vh', width: '100%' }}>
					<AgGridReact
						rowData={rowData}
						columnDefs={columnDefs}
						defaultColDef={{ resizable: true }}
					></AgGridReact>
				</div>
			</div>
		</div>
	)
}
export default AdminUsers
