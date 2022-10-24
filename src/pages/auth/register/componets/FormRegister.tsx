import { authApi } from '@/api/authApi'
import { useAppDispatch } from '@/app/hook'
import { FacebookFilled } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd'
import { NotificationPlacement } from 'antd/lib/notification'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from '../RegisterPage.module.scss'
import ImageLogo from '../../../../assets/image/bbsgl.png'

const Register: React.FC = () => {
	const { t } = useTranslation()

	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState<{ message: string | null; errorCode: number }>()
	const dispatch = useAppDispatch()

	const onFinish = async (values: any) => {
		try {
			setLoading(true)

			await authApi.register(values)

			notification.success({
				message: `Thank you!`,
				description:
					'A new user account has been successfully created and a confirmation has been emailed to you. Please check your email and confirm your email address to complete the registration process.',
				placement: 'top',
			})

			setLoading(false)
		} catch (error: any) {
			const { response } = error
			notification.error({
				message: `Notification ${response.data.message}`,
				placement: 'top',
			})
			setLoading(false)
		}
	}

	return (
		<Row justify="center">
			<Col span={19}>
				<Form
					className={styles.container__antform}
					labelCol={{ flex: '140px' }}
					labelAlign="left"
					labelWrap
					wrapperCol={{ span: 24 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Row justify="center">
						<Col>
							<Link to={'/'}>
								<div>
									<img
									src={ImageLogo}
									alt="???"
									style={{width:'100%'}}
								/>
								</div>
								
							</Link>
						</Col>
					</Row>
					<Form.Item>
						<p className={styles.container__antform__heading} style={{ fontSize: 20 }}>
							{t('AUTH.TITLE_REGISTER')}
						</p>
					</Form.Item>

					<Divider
						className={styles.container__antform__divider}
						orientation="center"
						style={{ color: 'gray' }}
					>
						{t('AUTH.DIVIDER')}
					</Divider>
					<Form.Item
						className={styles.container__antform__item}
						name="email"
						rules={[
							{ type: 'email', message: t('AUTH.EMAIL_VALID_MESSAGE') },
							{ required: true, message: t('AUTH.EMAIL_REQUIRED_MESSAGE') },
						]}
					>
						<Input autoComplete="off" size="large" placeholder={t('AUTH.INPUT_EMAIL')} />
					</Form.Item>
					<Form.Item
						className={styles.container__antform__item}
						name="name"
						rules={[
							{ required: true, message: t('AUTH.FULLNAME_REQUIRED_MESSAGE') },
							{
								pattern: new RegExp('^([a-zA-Z ]+[a-zA-Z ]{1,})$'),
								message: t('AUTH.FULLNAME_INVALID_MESSAGE'),
							},
						]}
					>
						<Input autoComplete="off" size="large" placeholder={t('AUTH.INPUT_FULLNAME')} />
					</Form.Item>
					<Form.Item
						className={styles.container__antform__item}
						name="username"
						rules={[
							{ required: true, message: t('AUTH.USERNAME_REQUIRED_MESSAGE') },
							{ min: 6, message: t('AUTH.USERNAME_MIN_MESSAGE') },
							{
								pattern: new RegExp('^([a-zA-Z0-9]+[a-zA-Z0-9]{1,})$'),
								message: t('AUTH.USERNAME_INVALID_MESSAGE'),
							},
						]}
					>
						<Input autoComplete="off" size="large" placeholder={t('AUTH.INPUT_USERNAME')} />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{ required: true, message: t('AUTH.PASSWORD_REQUIRED_MESSAGE') },
							{ min: 6, message: t('AUTH.PASSWORD_MIN_MESSAGE') },
						]}
					>
						<Input.Password autoComplete="off" size="large" placeholder={t('AUTH.INPUT_PASSWORD')} />
					</Form.Item>
					<Form.Item>
						<p>
							{t('AUTH.ABOUT')} <a href="#">{t('AUTH.LEARN_MORE')}</a>
						</p>
						<br />
						<p>
							{t('AUTH.ABOUT_POLICY')} <a href="#">{t('AUTH.POLICY')}</a> {t('AUTH.AND')}
							<a href="#">{t('AUTH.COOKIE_POLICY')}</a>.
						</p>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 24 }}>
						<Button type="primary" htmlType="submit" size="large" loading={loading}>
							{t('AUTH.REGISTER')}
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default Register
