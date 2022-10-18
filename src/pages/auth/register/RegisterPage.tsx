import { Col, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import FormRegister from './componets/FormRegister'
import styles from './RegisterPage.module.scss'

import { useAppSelector } from '@/app/hook'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Container } from './styles';

const RegisterPage: React.FC = () => {
	const { t } = useTranslation()

	const isAuth = useAppSelector((state) => state.authSlice.user)

	const navigate = useNavigate()

	useEffect(() => {
		isAuth && navigate('/')
	}, [isAuth])
	return (
		<div className={styles.container}>
			<div style={{ width: '100%' }}>
				<Row justify="center">
					<Col span={11} className={styles.container__border}>
						<FormRegister />
					</Col>
				</Row>
				<Row justify="center">
					<Col span={11}>
						<div className={styles.redirectlogin}>
							<p>
								{t('AUTH.HAVE_ACCOUNT')}
								<Link to={'/login'}>{t('AUTH.LOGIN')}</Link>
							</p>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default RegisterPage
