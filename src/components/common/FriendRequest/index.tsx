import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import React from 'react'
import styles from './FriendRequest.module.scss'
import { useTranslation } from 'react-i18next'

// import { Container } from './styles';

interface props {
	avatar: any
	username: any
	time: any
}

const FriendRequest: React.FC<props> = ({ avatar, username, time }) => {
	const { t } = useTranslation()

	const handleClickCofirm = () => {}
	const handleClickDelete = () => {}

	return (
		<div>
			<Row>
				<Col span={3}>
					<Avatar size="default" icon={<UserOutlined />} src={avatar} />
				</Col>
				<Col span={21}>
					<Row style={{ paddingTop: '3px' }}>
						<p style={{ fontWeight: 500, paddingRight: '5px' }}>{username}</p>

						<p>{t('FRIEND_SEND_REQUEST')}</p>
					</Row>
					<Row>
						<p style={{ fontSize: '11px' }}>{time}</p>
					</Row>
				</Col>
			</Row>
			<Row justify="end" style={{ paddingBottom: '5px' }}>
				<Button type="primary" size="small" style={{ marginRight: '2px' }} onClick={handleClickCofirm}>
					{t('CONFIRM')}
				</Button>
				<Button size="small" onClick={handleClickDelete}>
					{t('DELETE')}
				</Button>
			</Row>
		</div>
	)
}

export default FriendRequest
