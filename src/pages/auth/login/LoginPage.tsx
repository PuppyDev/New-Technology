import React from 'react'
import { Col, Row, Image, Form, Button } from 'antd'
import FormLogin from '../login/components/FormLogin'
import styles from './LoginPage.module.scss'
import ImageLogo from '../../../assets/image/imageLogo.png'
import { Link } from 'react-router-dom'

const LoginForm = () => {
	return (
		<div className={styles.container}>
			<Row justify="center">
				<Col span={12}>
					<div style={{ height: '100%' }}>
            <img src={ImageLogo} alt="image" style={{width:"100%",height:"100%"}}/>
					</div>
				</Col>
				<Col span={10}>
					<div style={{ width: '100%F' }}>
						<Row justify="center">
							<FormLogin></FormLogin>
						</Row>
						<Row className="row-rec-register" align="middle">
							<Col span={24}>
								<Form wrapperCol={{ span: 20 }} className={styles.container__redirectregister}>
									<Form.Item>
										<span>Bạn quên mật khẩu ?</span>
										<Link to="/register">Đăng kí</Link>
									</Form.Item>
								</Form>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default LoginForm
