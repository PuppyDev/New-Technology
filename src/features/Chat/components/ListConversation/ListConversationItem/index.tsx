import { Avatar } from 'antd'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './ListConversationItem.module.scss'

interface props {
	conversation: {
		id: Number
		name: String
		image: String
		lastTimeActive: String
		isActive: Boolean
		lastMessage: String
	}
}

const ListConversationItem: React.FC<props> = ({ conversation }) => {
	let { inboxId } = useParams()

	if (!conversation) return null

	const contentRender = (isActive = false) => (
		<li className={`${styles.item} ${isActive ? styles.active : ''}`}>
			<Avatar size={56} src={conversation.image} style={{ border: '1px solid rgb(219, 219, 219)' }} />

			<div className={styles.item__content}>
				<p className={styles.item__contentName}>{conversation.name}</p>
				<p>{conversation.lastMessage}</p>
			</div>
		</li>
	)

	if (!inboxId || conversation?.id !== +inboxId) {
		// return contentRender
		return <Link to={`/direct/inbox/${conversation.id}`}>{contentRender()}</Link>
	}

	return <>{contentRender(true)}</>
}

export default ListConversationItem
