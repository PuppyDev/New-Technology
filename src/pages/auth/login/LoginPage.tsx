import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ImageLogo from '../../../assets/image/imageLogo.png'
import FormLogin from '../login/components/FormLogin'
import styles from './LoginPage.module.scss'

import { useAppSelector } from '@/app/hook'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const { t } = useTranslation()

	const isAuth = useAppSelector((state) => state.authSlice.user)

	const navigate = useNavigate()

	useEffect(() => {
		isAuth && navigate('/')
	}, [isAuth])

	return (
		<div className={styles.container}>
			<Row justify="center">
				<Col span={12}>
					<div style={{ height: '100%' }}>
						<img src={ImageLogo} alt="image" style={{ width: '100%', height: '100%' }} />
					</div>
				</Col>
				<Col span={10}>
					<div style={{ width: '100%F' }}>
						<Row justify="center">
							<FormLogin></FormLogin>
						</Row>
						<Row justify="center" className={styles.container__div_row}>
							<div>
								<span>{t('AUTH.DONT_HAVE_ACCOUNT')}</span>
								<Link to="/register">{t('AUTH.SIGN_UP')}</Link>
							</div>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default LoginForm
