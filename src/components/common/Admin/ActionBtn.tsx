import React from 'react'
import { ICellRendererParams } from 'ag-grid-community'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
export const Delete = (props: ICellRendererParams) => {
	return (
		<span>
			<Button type="primary" onClick={() => console.log('delete')} icon={<DeleteOutlined />}>
				Delete
			</Button>
		</span>
	)
}
export const Edit = (props: ICellRendererParams) => {
	return (
		<span>
			<Button type="primary" onClick={() => console.log('delete')} icon={<EditOutlined />}>
				Edit
			</Button>
		</span>
	)
}
