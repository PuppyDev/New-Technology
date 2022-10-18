import React from 'react'
import { Col, Row } from 'antd'
import styles from './RegisterPage.module.scss'
import FormRegister from './componets/FormRegister'

// import { Container } from './styles';

const RegisterPage: React.FC = () => {
	return (
        <div className={styles.container}>
            <Row justify='center'>
                <Col span={7}>
                    <FormRegister/>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={7}>
                    <div className={styles.redirectlogin}>
                        <p>
                            Do you have acount?
                            <a> Login</a>
                        </p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterPage
