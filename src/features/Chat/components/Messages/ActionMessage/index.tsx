import { messageApi } from '@/api/messageApi'
import { useAppDispatch } from '@/app/hook'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import { Message } from '@/models/message'
import { EllipsisOutlined, EnterOutlined, SmileOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { useContext } from 'react'
import { Trans } from 'react-i18next'

import styles from './ActionMessage.module.scss'

const ActionMessage = ({
	reverse = false,
	msg,
	messageObj,
}: {
	reverse?: boolean
	msg: String | React.ReactNode
	messageObj?: Message
}) => {
	const dispatch = useAppDispatch()
	const msgSend = typeof msg === 'string' ? msg : 'file đính kèm'

	const socket = useContext(SocketContext)

	if (!messageObj) return null

	const handleRemoveMessage = async () => {
		// Call api to remove message in here
		try {
			await messageApi.deleteMessage({ messageId: messageObj._id.toString(), roomId: messageObj.room.toString() })
		} catch (error) {
			console.log('🚀 ~ file: index.tsx ~ line 32 ~ handleRemoveMessage ~ error', error)
		}
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
		if (socket) {
			const { _id: messageId, room: roomId } = messageObj
			socket.emit('chat:pin-message', { messageId, roomId })
		}
	}

	return (
		<ul className={`${styles.action__message} ${reverse && styles.action__reverse}`}>
			<li>
				<Dropdown
					overlay={
						<div className={styles.action__mesage_overlay}>
							<span onClick={handleRemoveMessage}>
								<Trans>CONVERSATION.UNSEND_MESSAGE</Trans>
							</span>
							<span onClick={handlePinMessage}>
								<Trans>CONVERSATION.PIN_MESSAGE</Trans>
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
