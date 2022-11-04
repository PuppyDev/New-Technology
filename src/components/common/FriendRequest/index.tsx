import { roomApi } from '@/api/roomApi'
import { userApi } from '@/api/userApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { setConversations, setConversationSelected } from '@/Chat/index'
import { NotificationRequest } from '@/models/notification'
import { Room } from '@/models/room'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Header/Header.module.scss'

const FriendRequest = ({ notification }: { notification: NotificationRequest }) => {
	console.log('🚀 ~ file: index.tsx ~ line 16 ~ FriendRequest ~ notification', notification)
	const { t } = useTranslation()

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [loadingAccept, setLoadingAccept] = useState(false)
	const socket = useContext(SocketContext)

	const handleClickCofirm = async () => {
		if (!socket) return

		try {
			setLoadingAccept(true)
			const response = await userApi.acceptRequestFriend({
				requestedUserId: notification.requestedUserId,
				requestedUsername: notification?.requestAccount,
			})
			const responseRoom = await roomApi.getRoomConversation()

			const room: Room = response.data.room

			await dispatch(setConversations({ conversations: responseRoom.data.room }))

			socket.emit('user:accept_add_friend', {
				userId: notification.requestedUserId,
				username: notification?.requestAccount,
				room,
			})

			dispatch(setConversationSelected(room))
			navigate(`/direct/inbox/${room._id}`)
			notification.isChecked = false
			notification.isAccept = false
			notification.accepted = true
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 23 ~ handleClickCofirm ~ err', err)
		}
		setLoadingAccept(false)
	}

	// Remove Friend Request
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

	if (notification.isAccept || notification.accepted)
		return (
			<div className={styles.requestItem}>
				{!notification.isChecked &&
					(notification.isAccept ? (
						<Row align="middle">
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
									<p>đã chấp nhận lời mời kết bạn của bạn</p>
								</Row>
							</Col>
						</Row>
					) : (
						<>
							<Row align="middle">
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
					))}
			</div>
		)

	return (
		<div className={styles.requestItem}>
			{!notification.isChecked && (
				<>
					<Row align="middle">
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
						<Button
							type="primary"
							size="small"
							style={{ marginRight: '2px' }}
							loading={loadingAccept}
							onClick={handleClickCofirm}
						>
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
