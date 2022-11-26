import { useAppDispatch, useAppSelector } from '@/app/hook'
import { setConversationSelected } from '@/Chat/slices/ChatSlice'
import { Room } from '@/models/room'
import { Avatar } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './ListConversationItem.module.scss'

interface props {
	conversation: Room
}

const ListConversationItem: React.FC<props> = ({ conversation }) => {
	let { inboxId } = useParams()

	if (!conversation) return null

	const user = useAppSelector((state) => state.authSlice.user)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const contentRender = (isActive = false, isRead = false) => {
		const userInfo = conversation.users[0]._id === user?._id ? conversation.users[1] : conversation.users[0]
		const lastMessage = conversation.messages[conversation.messages.length - 1]
		const messageDisplay: any = (lastMessage?.type === 'TEXT' ? lastMessage?.message : lastMessage?.type) || ''
		return (
			<li className={`${styles.item} ${!isRead ? styles.notRead : ''} ${isActive ? styles.active : ''}`}>
				<Avatar
					size={56}
					src={
						conversation.group
							? conversation.avatar
							: userInfo?.image || 'https://joeschmoe.io/api/v1/random'
					}
					style={{ border: '1px solid rgb(219, 219, 219)', userSelect: 'none' }}
				/>

				<div className={styles.item__content}>
					<p className={styles.item__contentName}>{userInfo?.name}</p>
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
