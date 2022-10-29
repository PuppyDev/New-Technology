import { useAppDispatch } from '@/app/hook'
import { setConversationSelected } from '@/Chat/slices/ChatSlice'
import { Room } from '@/models/room'
import { Avatar } from 'antd'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import styles from './ListConversationItem.module.scss'

interface props {
	conversation: Room
}

const ListConversationItem: React.FC<props> = ({ conversation }) => {
	let { inboxId } = useParams()

	if (!conversation) return null

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const contentRender = (isActive = false, isRead = false) => {
		const { name } = conversation.users[0]
		const lastMessage = conversation.messages[conversation.messages.length - 1]
		const messageDisplay: any = (lastMessage?.type === 'TEXT' ? lastMessage?.message : lastMessage?.type) || ''
		return (
			<li className={`${styles.item} ${!isRead ? styles.notRead : ''} ${isActive ? styles.active : ''}`}>
				<Avatar
					size={56}
					src={conversation.avatar || 'https://joeschmoe.io/api/v1/random'}
					style={{ border: '1px solid rgb(219, 219, 219)', userSelect: 'none' }}
				/>

				<div className={styles.item__content}>
					<p className={styles.item__contentName}>{name}</p>
					{messageDisplay && <p>{messageDisplay}</p>}
				</div>

				{!isRead && <div className={styles.circelNotRead}></div>}
			</li>
		)
	}

	const handleSelectConversation = () => {
		dispatch(setConversationSelected(conversation))
		navigate(`/direct/inbox/${conversation._id}`)
	}

	if (!inboxId || conversation?._id !== inboxId) {
		// return contentRender
		return <div onClick={handleSelectConversation}>{contentRender()}</div>
	}

	return <>{contentRender(true, true)}</>
}

export default ListConversationItem
