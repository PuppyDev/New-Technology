import { Room } from '@/models/room'
import { Avatar } from 'antd'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './ListConversationItem.module.scss'

interface props {
	conversation: Room
}

const ListConversationItem: React.FC<props> = ({ conversation }) => {
	let { inboxId } = useParams()

	if (!conversation) return null

	const contentRender = (isActive = false, isRead = false) => (
		<li className={`${styles.item} ${!isRead ? styles.notRead : ''} ${isActive ? styles.active : ''}`}>
			<Avatar
				size={56}
				src={conversation.avatar || 'https://joeschmoe.io/api/v1/random'}
				style={{ border: '1px solid rgb(219, 219, 219)', userSelect: 'none' }}
			/>

			<div className={styles.item__content}>
				<p className={styles.item__contentName}>{conversation.users[0]?.name}</p>
				{conversation.messages && <p>{conversation.messages[0]?.message}</p>}
			</div>

			{!isRead && <div className={styles.circelNotRead}></div>}
		</li>
	)

	if (!inboxId || conversation?._id !== inboxId) {
		// return contentRender
		return <Link to={`/direct/inbox/${conversation._id}`}>{contentRender()}</Link>
	}

	return <>{contentRender(true, true)}</>
}

export default ListConversationItem
