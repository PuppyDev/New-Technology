import { roomApi } from '@/api/roomApi'
import { userApi } from '@/api/userApi'
import { useAppDispatch } from '@/app/hook'
import { setConversations, setConversationSelected } from '@/Chat/index'
import { NotificationRequest } from '@/models/notification'
import { Room } from '@/models/room'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import styles from '../Header/Header.module.scss'

const FriendRequest = ({ notification }: { notification: NotificationRequest }) => {
	const { t } = useTranslation()

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleClickCofirm = async () => {
		try {
			const response = await userApi.acceptRequestFriend({
				requestedUserId: notification.requestedUserId,
				requestedUsername: notification?.requestAccount,
			})
			const responseRoom = await roomApi.getRoomConversation()

			const room: Room = response.data.room

			dispatch(setConversations({ conversations: responseRoom.data.rooms }))

			dispatch(setConversationSelected(room))
			navigate(`/direct/inbox/${room._id}`)
			notification.isChecked = true
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 23 ~ handleClickCofirm ~ err', err)
		}
	}

	const handleClickDelete = async () => {
		try {
			const response = await userApi.removeRequestFriend({
				requestedUserId: notification.requestedUserId,
				requestedUsername: notification?.requestAccount,
			})
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 35 ~ handleClickDelete ~ err', err)
		}
	}

	return (
		<div className={styles.requestItem}>
			{notification.isChecked && (
				<>
					<Row>
						<Col span={3}>
							<Avatar size="default" icon={<UserOutlined />} src={notification?.image} />
						</Col>
						<Col span={21}>
							<Row style={{ paddingTop: '3px' }}>
								<Link
									to={notification.requestedUserId}
									style={{ fontWeight: 500, paddingRight: '5px' }}
								>
									{notification?.requestUserName}
								</Link>

								{/* <p>{t('FRIEND_SEND_REQUEST')}</p> */}
								<p>Bạn và {notification.requestUserName} đã trở thành bạn bè</p>
							</Row>
						</Col>
					</Row>
				</>
			)}
			{!notification.isChecked && (
				<>
					<Row>
						<Col span={3}>
							<Avatar size="default" icon={<UserOutlined />} src={notification?.image} />
						</Col>
						<Col span={21}>
							<Row style={{ paddingTop: '3px' }}>
								<Link
									to={notification.requestedUserId}
									style={{ fontWeight: 500, paddingRight: '5px' }}
								>
									{notification?.requestUserName}
								</Link>

								<p>{t('FRIEND_SEND_REQUEST')}</p>
							</Row>
							<Row>{/* <p style={{ fontSize: '11px' }}>{time}</p> */}</Row>
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
				</>
			)}
		</div>
	)
}

export default FriendRequest
