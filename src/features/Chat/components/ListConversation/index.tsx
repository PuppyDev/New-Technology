import { roomApi } from '@/api/roomApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { openNotificationWithIcon } from '@/components/common/ToastMessage'
import { Room } from '@/models/room'
import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { setConversations } from '../..'
import styles from './ListConversation.module.scss'
import ListConversationItem from './ListConversationItem'
import ListConversationMul from './ListConversationMul'

const ListConversation = () => {
	const dispatch = useAppDispatch()

	const roomConvesation = useAppSelector((state) => state.chatSlice.conversations)
	const user = useAppSelector((state) => state.authSlice.user) || { name: 'Loading...' }

	// SOCKET-CLIENTS HERE!!!
	/** Using socket and listen socket right here */
	useEffect(() => {
		;(async () => {
			try {
				if (!roomConvesation) {
					const response = await roomApi.getRoomConversation()
					console.log('🚀 ~ file: index.tsx ~ line 25 ~ ; ~ response', response)
					dispatch(setConversations({ conversations: response.data.rooms }))
				}
			} catch (err) {
				console.log(err)
				if (err) openNotificationWithIcon('error', 'Something wrong please contact an admin!!!')
			}
		})()
	}, [])

	// ListConversationValues.sort((item1, item2) => {
	// 	return item2.createAt - item1.createAt
	// })

	return (
		<div className={styles.ListConversation}>
			<div className={styles.topContent}>
				<p className={styles.headerItem}>{user.name}</p>
			</div>
			<ul className={styles.bottomContent}>
				{roomConvesation &&
					roomConvesation.map((item) => {
						return item?.group ? (
							<ListConversationMul key={item._id} conversation={item} />
						) : (
							<ListConversationItem key={item._id} conversation={item} />
						)
					})}

				{!roomConvesation &&
					Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className={styles.skeleton}>
							<Skeleton.Avatar active size={55} />
							<div className={styles.listItem}>
								<Skeleton.Input active size="small" />
								<Skeleton.Input active block size="small" />
							</div>
						</div>
					))}
			</ul>
		</div>
	)
}

export default ListConversation
