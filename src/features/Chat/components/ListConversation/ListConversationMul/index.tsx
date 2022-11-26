import { roomApi } from '@/api/roomApi'
import { useAppDispatch } from '@/app/hook'
import { setConversationSelected, setPinMessage } from '@/Chat/slices/ChatSlice'
import { Room } from '@/models/room'
import { Avatar } from 'antd'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import styles from '../ListConversationItem/ListConversationItem.module.scss'

interface props {
	conversation: Room
}

const ListConversationMul: React.FC<props> = ({ conversation }) => {
	let { inboxId } = useParams()

	if (!conversation) return null

	const fetchAllPinMessages = async () => {
		try {
			const response = await roomApi.getAllPinMessages({ roomId: conversation._id })
			const pinMessage = response.data.pinMessage.pinMessage
			dispatch(setPinMessage(pinMessage))
			// setAllPinMessages(pinMessage)
		} catch (err) {
			dispatch(setPinMessage([]))
			console.log('🚀 ~ file: index.tsx ~ line 152 ~ fetchAllPinMessages ~ err', err)
		}
	}

	const contentRender = (isActive = false, isRead = false) => (
		<li className={`${styles.item} ${!isRead ? styles.notRead : ''} ${isActive ? styles.active : ''}`}>
			<Avatar
				size={56}
				src="https://vnn-imgs-f.vgcloud.vn/2019/10/09/23/bo-qua-lum-xum-huong-ly-ra-mat-mv-moi.jpg"
				style={{ border: '1px solid rgb(219, 219, 219)', userSelect: 'none' }}
			/>

			<div className={styles.item__content}>
				<p className={styles.item__contentName}>{conversation.name}</p>
				<p>{conversation.messages[0]?.message}</p>
			</div>

			{!isRead && <div className={styles.circelNotRead}></div>}
		</li>
	)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleSelectConversation = () => {
		dispatch(setConversationSelected(conversation))
		fetchAllPinMessages()
		navigate(`/direct/inbox/${conversation._id}`)
	}

	if (!inboxId || conversation?._id !== inboxId) {
		// return contentRender
		return <div onClick={handleSelectConversation}>{contentRender()}</div>
	}

	return <>{contentRender(true, true)}</>
}

export default ListConversationMul
