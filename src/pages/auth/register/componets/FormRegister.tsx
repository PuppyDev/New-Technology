import { FacebookFilled } from '@ant-design/icons'
import { Button, Form, Input, Image, Col, Row, Divider } from 'antd'
import React from 'react'

import styles from '../RegisterPage.module.scss'

// import { Container } from './styles';

const Register: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			className={styles.container__antform}
			labelCol={{ flex: '140px' }}
			labelAlign="left"
			labelWrap
			wrapperCol={{ span: 24 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Row justify="center">
				<Col span={18}>
					<Button className={styles.container__antform__btnlogo}>
						<img
							src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
							alt="???"
						/>
					</Button>
				</Col>
			</Row>
			<Form.Item>
				<p className={styles.container__antform__heading} style={{ fontSize: 18 }}>
					Sign up to see photos and videos from friends.
				</p>
			</Form.Item>
				<Button type="primary" icon={<FacebookFilled />} size="middle">
					Đăng nhập với Facebook
				</Button>
			<Divider className={styles.container__antform__divider} orientation="center" style={{color:'gray'}}>
				OR
			</Divider>
			<Form.Item className={styles.container__antform__item} name="contact">
				<Input size="small" placeholder="Mobie number or email" />
			</Form.Item>
			<Form.Item className={styles.container__antform__item} name="fullname">
				<Input size="small" placeholder="Full name" />
			</Form.Item>
			<Form.Item className={styles.container__antform__item} name="username">
				<Input size="small" placeholder="User name" />
			</Form.Item>
			<Form.Item name="password">
				<Input.Password size="small" placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<p>
					Users of our service may have uploaded your contact information to Instagram.{' '}
					<a href="#">Learn more</a>
				</p>
				<br />
				<p>
					By signing up, you agree to our <a href="#">Terms , Privacy Policy</a> and{' '}
					<a href="#">Cookie Policy</a>.
				</p>
			</Form.Item>
			<Form.Item wrapperCol={{ span: 24 }}>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Register
