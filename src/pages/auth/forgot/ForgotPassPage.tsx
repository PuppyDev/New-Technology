import { LockOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Avatar, Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ForgotPassPage.module.scss'

// import { Container } from './styles';

const ForgotPassPage: React.FC = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className={styles.container}>
			<div style={{ width: '100%' }}>
				<Row justify="center">
					<Col span={10} className={styles.border_form}>
						<Row justify="center" style={{ paddingTop: '0px' }}>
							<Col span={20}>
								<Form>
									<Form
										name="basic"
										wrapperCol={{ span: 24 }}
										initialValues={{ remember: true }}
										onFinish={onFinish}
										onFinishFailed={onFinishFailed}
										autoComplete="off"
									>
										<div style={{ paddingBottom: '10px' }}>
											<Row justify="center">
												<span style={{ fontSize: '60px' }}>
													<LockOutlined />
												</span>
											</Row>
											<Row justify="center">
												<p style={{ fontWeight: 500, fontSize: '18px' }}>
													Having trouble logging in?
												</p>
											</Row>
											<Row justify="center">
												<p style={{ textAlign: 'center' }}>
													Enter your email, phone number or username and we'll send you a link
													to access your account again.
												</p>
											</Row>
										</div>
										<Form.Item
											name="email"
											rules={[{ required: true, message: 'Please input your email!' }]}
										>
											<Input className={styles.input} size="large" placeholder="Your email" />
										</Form.Item>
										<Form.Item>
											<Button type="primary" size="middle" htmlType="submit">
												Send login link
											</Button>
										</Form.Item>

										<Divider className={styles.Divier} orientation="center">
											OR
										</Divider>
										<Row justify="center" style={{ paddingBottom: '30px' }}>
											<Link className={styles.link} to={'/register'}>
												Create new account
											</Link>
										</Row>
									</Form>
								</Form>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row justify="center" style={{paddingTop:'10px'}}>
					<Col span={10} className={styles.border_form}>
						<div style={{width:'100%', padding:'20px'}}>
							<Link className={styles.link} to={'/home'} style={{textAlign:'center'}}>
								Back to login
							</Link>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default ForgotPassPage
