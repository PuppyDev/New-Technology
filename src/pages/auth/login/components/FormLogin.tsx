import React from 'react'
import { Button, Form, Input, Image, Divider, Row, Col } from 'antd'
import { FacebookFilled } from '@ant-design/icons'
import styles from '../LoginPage.module.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Login() {
	const { t } = useTranslation()

	const onFinish = () => {
		console.log('Success:')
	}

	const onFinishFailed = () => {
		console.log('Failed:')
	}
	return (
		<Row justify="center" className={styles.container__border}>
			<Col span={20}>
				<Form
					className={styles.container__antform}
					wrapperCol={{ span: 24 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Link to="/">
						<Image
							src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-world.net%2Fwp-content%2Fuploads%2F2020%2F04%2FInstagram-Logo-2010-2013.png&f=1&nofb=1&ipt=b62dc7579e3af6fffec776ec72377be923cd58b6aa4670d7aff9ecb6976faa0f&ipo=images"
							alt="logo"
							preview={false}
						/>
					</Link>
					<Form.Item name="username" style={{ marginBottom: '10px' }}>
						<Input size="large" placeholder={t('AUTH.INPUT_USER_NAME')} />
					</Form.Item>

					<Form.Item name="password" style={{ marginBottom: '16px' }}>
						<Input.Password size="large" placeholder={t('AUTH.INPUT_PASSWORD')} />
					</Form.Item>
					<Form.Item style={{ marginBottom: '10px' }}>
						<Button
							className={styles.Container}
							type="primary"
							htmlType="submit"
							size="large"
							id="btn-submit"
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
