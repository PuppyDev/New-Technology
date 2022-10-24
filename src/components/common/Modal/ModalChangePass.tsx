import { Avatar, Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import styles from './Modal.module.scss'

// import { Container } from './styles';
interface props {
	open: any
	setOpen: Function
}

const ModalChangePass: React.FC<props> = ({ open, setOpen }) => {
	const onFinish = (values: any) => {
		console.log('Success:', values)
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	const handleCancel = () => {
		setOpen(false)
	}
	return (
		<Modal
			open={open}
			title={<div className={styles.titleModal}>Change password</div>}
			onCancel={handleCancel}
			footer={false}
			className={styles.modal}
		>
			<Form
				name="basic"
				wrapperCol={{ span: 24 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item name="username">
					<div>
						<Avatar
							size={75}
							src={
								'https://1.bp.blogspot.com/-14OBLuCjt18/YTxB7eDoqmI/AAAAAAADgnQ/G6XdOMvLHxQO115ls3_B8Mn3Lp_7CI0jACLcBGAsYHQ/s0/205063957_197049568871309_7084714486385822213_n.jpg'
							}
						/>
						<span style={{ fontSize: '24px', fontWeight: 400, marginTop:'10px',paddingLeft:'10px' }}>Vờ rô ni ca lucifer</span>
					</div>
				</Form.Item>
				<Form.Item name="oldpass" rules={[{ required: true, message: 'Please input old password!' }]}>
					<Input.Password size='large' placeholder="Nhập mật khẩu cũ" />
				</Form.Item>

				<Form.Item name="newpassword" rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password size='large' placeholder="Nhập mật khẩu mới" />
				</Form.Item>

				<Form.Item name="confirmpass">
					<Input.Password size='large' placeholder="Xác nhận password" />
				</Form.Item>
				<Form.Item>
					<Button key="back" onClick={handleCancel} size='large'>
						Cancel
					</Button>
					,
					<Button key="submit" type="primary" htmlType="submit" size='large'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default ModalChangePass
