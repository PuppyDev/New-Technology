import React from 'react'
import { Button, Form, Input, Image, Divider } from 'antd'
import { FacebookFilled } from '@ant-design/icons'
import styles from '../LoginPage.module.scss'

function Login() {
	const onFinish = () => {
		console.log('Success:')
	}

	const onFinishFailed = () => {
		console.log('Failed:')
	}
	return (
		<Form
			className={styles.container__antform}
			labelCol={{ flex: '110px' }}
			labelAlign="left"
			labelWrap
			wrapperCol={{ span: 20 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item>
				<Image
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FInstagram-Logo-2010-2013.png&f=1&nofb=1&ipt=b62dc7579e3af6fffec776ec72377be923cd58b6aa4670d7aff9ecb6976faa0f&ipo=images"
					alt="logo"
				/>
			</Form.Item>
			<Form.Item name="username">
				<Input size="middle" placeholder="phone number, username or email" />
			</Form.Item>

			<Form.Item name="password">
				<Input.Password size="middle" placeholder="password" />
			</Form.Item>
			<Form.Item>
				<Button
					className={styles.Container}
					type="primary"
					htmlType="submit"
					size="middle"
					id="btn-submit"
				>
					Login
				</Button>
			</Form.Item>
			<Form.Item>
				<Divider className={styles.container__antform__divider} orientation="center">
					OR
				</Divider>
			</Form.Item>
			<Form.Item>
				<Button type="link" icon={<FacebookFilled />} size="large">
					Đăng nhập với Facebook
				</Button>
			</Form.Item>
			<Form.Item>
				<Button style={{ color: 'black', width: '100%' }} type="link">
					Quên mật khẩu?
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Login
