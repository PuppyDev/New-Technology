import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'

import styles from './Modal.module.scss'

interface props {
	open: any
	setOpen: Function
}
const onFinish = (values: any) => {
	console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

const ModalPost: React.FC<props> = ({ open, setOpen }) => {
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'data:image/jpeg;base64,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',
		},
	])

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader()
				reader.readAsDataURL(file.originFileObj as RcFile)
				reader.onload = () => resolve(reader.result as string)
			})
		}
		const image = new Image()
		image.src = src
		const imgWindow = window.open(src)
		imgWindow?.document.write(image.outerHTML)
	}

	return (
		<Modal
			title={<div className={styles.titleModal}>Create new post</div>}
			centered
			open={open}
			onCancel={() => {
				setOpen(false)
			}}
			className={styles.modal}
			footer={null}
			closable={false}
		>
			<div className={styles.modalContentPost}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Caption"
						name="caption"
						rules={[{ required: true, message: 'Please input your  caption!' }]}
					>
						<Input />
					</Form.Item>

					<ImgCrop rotate>
						<Upload
							action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
							listType="picture-card"
							fileList={fileList}
							onChange={onChange}
							onPreview={onPreview}
						>
							{fileList.length < 5 && '+ Upload'}
						</Upload>
					</ImgCrop>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Modal>
	)
}

export default ModalPost
