import { useAppSelector } from '@/app/hook'
import useOpen from '@/hooks/useOpen'
import { Message } from '@/models/index'
import { Avatar, Spin } from 'antd'
import React from 'react'
import ActionMessage from '../ActionMessage'
import styles from './TextMessage.module.scss'

interface props {
	children: React.ReactNode
}

interface msg {
	msg: String | React.ReactNode
	loading?: boolean
	ispadding?: boolean
	messageObj?: Message
}

const TextMessage = ({ children }: props) => {
	return <div>{children}</div>
}

TextMessage.ListFriendMessage = ({ children, messageObj }: { children: React.ReactNode; messageObj: Message }) => {
	const { conversationSelected: roomSelected } = useAppSelector((state) => state.chatSlice)

	if (!roomSelected) return null

	const avt = roomSelected.users.find((user) => user.username === messageObj.sender)

	return (
		<div className={styles.blockMessage}>
			<Avatar size={24} src={avt?.image || 'https://joeschmoe.io/api/v1/random'} />
			<div className={styles.friendMessage}>{children}</div>
		</div>
	)
}

TextMessage.FriendMessage = ({ msg, ispadding = true, messageObj }: msg) => {
	const { open: showOption, handleSetOpen, handleSetClose } = useOpen()

	return (
		<div className={styles.action_content} onMouseEnter={handleSetOpen} onMouseLeave={handleSetClose}>
			<div className={`${styles.messageContent} ${ispadding && styles.padding}`}>{msg}</div>
			<div className={`${styles.hidden_content} ${showOption && styles.show_content}`}>
				<ActionMessage msg={msg} reverse messageObj={messageObj} />
			</div>
		</div>
	)
}

TextMessage.OwnerMessage = ({ messageObj, msg, loading = false, ispadding = true }: msg) => {
	const { open: showOption, handleSetOpen, handleSetClose } = useOpen()

	return (
		<div className={styles.ownerMessage} onMouseEnter={handleSetOpen} onMouseLeave={handleSetClose}>
			<div className={`${styles.hidden_content} ${showOption && styles.show_content}`}>
				<ActionMessage msg={msg} messageObj={messageObj} isDelete />
			</div>
			<div className={`${styles.messageContent} ${ispadding && styles.padding}`}>{msg}</div>
			{loading && <Spin size="small" style={{ marginTop: 'auto' }} />}
		</div>
	)
}

TextMessage.TimeMessage = ({ msg }: msg) => {
	return <div className={styles.timeConversation}>{msg}</div>
}

export default TextMessage
