import React from 'react'
import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './RegisterPage.module.scss'
import FormRegister from './componets/FormRegister'


// import { Container } from './styles';

const RegisterPage: React.FC = () => {
    const { t } = useTranslation()
	return (
		<div className={styles.container}>
			<div style={{width:'100%'}}>
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
								<Link to ={'/login'}>
                                    {t('AUTH.LOGIN')}
                                </Link> 
							</p>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default RegisterPage
