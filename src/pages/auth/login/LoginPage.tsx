import React from "react";
import { Col, Row, Image, Form, Button } from "antd";
import FormLogin from "../login/components/FormLogin"
import styles from "./LoginPage.module.scss"
import ImageLogo from "../../../assets/image/imageLogo.png"

const LoginForm = () => {
  return (
    <div className={styles.container}>
        <Row justify="center">
          <Col span={10}>
            <Image src={ImageLogo} alt="image" preview={false}/>
          </Col>
          <Col span={7}>
            <Row>
              <FormLogin></FormLogin>
            </Row>
            <Row className="row-rec-register" align="middle">
              <Col span={24}>
                <Form wrapperCol={{ span: 20 }}  className={styles.container__redirectregister}>
                  <Form.Item >
                    <span>Bạn quên mật khẩu ?</span>
                    <Button type="link" size="middle">
                      Đăng ký
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
    </div>
  );
};

export default LoginForm;
