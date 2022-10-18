import useOpen from '@/hooks/useOpen'
import { Avatar } from 'antd'
import React from 'react'
import ActionMessage from '../ActionMessage'
import styles from './TextMessage.module.scss'

interface props {
	children: React.ReactNode
}

interface msg {
	msg: String | React.ReactNode
}

const TextMessage = ({ children }: props) => {
	return <div>{children}</div>
}

TextMessage.ListFriendMessage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.blockMessage}>
			<Avatar size={24} src="https://joeschmoe.io/api/v1/random" />
			<div className={styles.friendMessage}>{children}</div>
		</div>
	)
}

TextMessage.FriendMessage = ({ msg }: msg) => {
	const { open: showOption, handleSetOpen, handleSetClose } = useOpen()

	return (
		<div className={styles.action_content} onMouseEnter={handleSetOpen} onMouseLeave={handleSetClose}>
			<div className={styles.messageContent}>{msg}</div>
			<div className={`${styles.hidden_content} ${showOption && styles.show_content}`}>
				<ActionMessage msg={msg} reverse />
			</div>
		</div>
	)
}

TextMessage.OwnerMessage = ({ msg }: msg) => {
	const { open: showOption, handleSetOpen, handleSetClose } = useOpen()

	return (
		<div className={styles.ownerMessage} onMouseEnter={handleSetOpen} onMouseLeave={handleSetClose}>
			<div className={`${styles.hidden_content} ${showOption && styles.show_content}`}>
				<ActionMessage msg={msg} />
			</div>
			<div className={styles.messageContent}>{msg}</div>
		</div>
	)
}

TextMessage.TimeMessage = ({ msg }: msg) => {
	return <div className={styles.timeConversation}>{msg}</div>
}

export default TextMessage
