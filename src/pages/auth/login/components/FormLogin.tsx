import { authApi } from '@/api/authApi'
import { useAppDispatch } from '@/app/hook'
import { LoginPayload } from '@/models/auth'
import { FacebookFilled } from '@ant-design/icons'
import { Button, Col, Divider, Form, Image, Input, notification, Row } from 'antd'
import { setLogin, setUser } from 'pages/auth/authSlice'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../LoginPage.module.scss'

function Login() {
	const { t } = useTranslation()

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loading, setLoading] = React.useState(false)
	const [error, setError] = useState<{ message: string | null; errorCode: number }>()
	const onFinish = async (values: LoginPayload) => {
		try {
			setLoading(true)

			const { data } = await authApi.login(values)
			localStorage.setItem('loginData', JSON.stringify(data))
			dispatch(setUser({ ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }))
			dispatch(setLogin(true))
			navigate('/')
			notification.success({
				message: `Login Success!`,
			})
			setLoading(false)
		} catch (error: any) {
			const { response } = error
			console.log('🚀 ~ file: FormLogin.tsx ~ line 35 ~ onFinish ~ error', error)
			if (response.data) {
				console.log('Vo')
				setError(response.data)
			} else
				notification.error({
					message: error.message,
				})
			setLoading(false)
		}
	}

	return (
		<Row justify="center" className={styles.container__border}>
			<Col span={20}>
				<Form
					className={styles.container__antform}
					wrapperCol={{ span: 24 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Image
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FInstagram-Logo-2010-2013.png&f=1&nofb=1&ipt=b62dc7579e3af6fffec776ec72377be923cd58b6aa4670d7aff9ecb6976faa0f&ipo=images"
						alt="logo"
						preview={false}
					/>
					<Form.Item
						name="email"
						style={{ marginBottom: '10px' }}
						rules={[
							{ required: true, message: t('AUTH.EMAIL_REQUIRED_MESSAGE') },
							{ type: 'email', message: t('AUTH.EMAIL_VALID_MESSAGE') },
						]}
					>
						<Input size="large" placeholder={t('AUTH.INPUT_USER_NAME')} />
					</Form.Item>

					<Form.Item
						name="password"
						style={{ marginBottom: '16px' }}
						rules={[
							{ required: true, message: t('AUTH.PASSWORD_REQUIRED_MESSAGE') },
							{ min: 6, message: t('AUTH.PASSWORD_MIN_MESSAGE') },
						]}
					>
						<Input.Password size="large" placeholder={t('AUTH.INPUT_PASSWORD')} />
					</Form.Item>

					{error && (
						<Form.Item style={{ marginBottom: '10px', color: 'red' }}>
							<p>{error.message}</p>
						</Form.Item>
					)}

					<Form.Item style={{ marginBottom: '10px' }}>
						<Button
							className={styles.Container}
							type="primary"
							htmlType="submit"
							size="large"
							id="btn-submit"
							disabled={loading}
							loading={loading}
						>
							{t('AUTH.LOGIN')}
						</Button>
					</Form.Item>
					<Form.Item style={{ marginBottom: '0px' }}>
						<Divider className={styles.container__antform__divider} orientation="center">
							{t('AUTH.DIVIDER')}
						</Divider>
					</Form.Item>
					<Form.Item style={{ marginBottom: '10px' }}>
						<Button
							type="link"
							icon={<FacebookFilled />}
							size="large"
							className={styles.container__antform__btnloginwfb}
						>
							{t('AUTH.LOGIN_WITH_FB')}
						</Button>
					</Form.Item>
					<Form.Item>
						<Row justify="center">
							<Link to={'/forgotpass'}>{t('AUTH.FORGOT_PASS')}</Link>
						</Row>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default Login
