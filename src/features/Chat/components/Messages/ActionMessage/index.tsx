import { messageApi } from '@/api/messageApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import { Message } from '@/models/message'
import { EllipsisOutlined, EnterOutlined, SmileOutlined } from '@ant-design/icons'
import { Dropdown, Menu, notification } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { useContext } from 'react'
import { Trans } from 'react-i18next'

import styles from './ActionMessage.module.scss'

const ActionMessage = ({
	reverse = false,
	msg,
	messageObj,
	isDelete = false,
}: {
	reverse?: boolean
	msg: String | React.ReactNode
	messageObj?: Message
	isDelete?: boolean
}) => {
	const dispatch = useAppDispatch()
	const msgSend = typeof msg === 'string' ? msg : 'file đính kèm'
	const user = useAppSelector((state) => state.authSlice.user)
	const socket = useContext(SocketContext)

	if (!messageObj) return null

	const { pinMessage } = useAppSelector((state) => state.chatSlice)
	const handleUnpinMessage = (messageId: string, roomId: string) => {
		socket?.emit('chat:delete-pin-message', { messageId, roomId })
	}
	const duplicatedPin = pinMessage.find((pin) => pin._id === messageObj._id.toString())

	const handleRemoveMessage = () => {
		// Call api to remove message in here
		if (!socket) return
		if (duplicatedPin)
			socket?.emit('chat:delete-pin-message', {
				messageId: duplicatedPin._id,
				roomId: duplicatedPin.room,
			})

		const deletMes = async () => {
			try {
				await messageApi.deleteMessage({
					messageId: messageObj._id.toString(),
					roomId: messageObj.room.toString(),
				})
				socket.emit('chat:delete-message', {
					messageId: messageObj._id.toString(),
					roomId: messageObj.room.toString(),
				})
			} catch (error) {
				console.log('🚀 ~ file: index.tsx ~ line 32 ~ handleRemoveMessage ~ error', error)
			}
		}
		setTimeout(() => {
			deletMes()
		}, 1000)
	}

	const handleResendMessage = () => {
		console.log('Resend Message')
	}

	const handleReplyMessage = () => {
		dispatch(
			setReplyMessage({
				replyMessage: {
					msg: msgSend,
					replyFor: messageObj.sender,
					_id: messageObj._id + '',
				},
			})
		)
	}

	const handlePinMessage = () => {
		if (pinMessage.length === 3) {
			return notification.warning({
				message: 'Warning Pin Message',
				description:
					'Pin message must pin 3 messages if you pin another message please unpin 1 or more message',
			})
		}

		if (socket) {
			const { _id: messageId, room: roomId } = messageObj
			socket.emit('chat:pin-message', { messageId, roomId, user })
		}
	}

	return (
		<ul className={`${styles.action__message} ${reverse && styles.action__reverse}`}>
			<li>
				<Dropdown
					overlay={
						<div className={styles.action__mesage_overlay}>
							{isDelete && (
								<span onClick={handleRemoveMessage}>
									<Trans>CONVERSATION.UNSEND_MESSAGE</Trans>
								</span>
							)}
							<span
								onClick={() =>
									!duplicatedPin
										? handlePinMessage()
										: handleUnpinMessage(duplicatedPin._id, duplicatedPin.room)
								}
							>
								{!duplicatedPin ? (
									<Trans>CONVERSATION.PIN_MESSAGE</Trans>
								) : (
									<Trans>CONVERSATION.UN_PIN</Trans>
								)}
							</span>
							<span onClick={handleResendMessage}>
								<Trans>CONVERSATION.FORWARD</Trans>
							</span>
						</div>
					}
					placement="top"
				>
					<EllipsisOutlined />
				</Dropdown>
			</li>
			<li>
				<EnterOutlined rotate={180} onClick={handleReplyMessage} />
			</li>
			{/* <li>
				<SmileOutlined />
			</li> */}
		</ul>
	)
}

export default ActionMessage
