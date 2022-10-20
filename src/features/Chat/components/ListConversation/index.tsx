import { roomApi } from '@/api/roomApi'
import { openNotificationWithIcon } from '@/components/common/ToastMessage'
import { Room } from '@/models/room'
import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import styles from './ListConversation.module.scss'
import ListConversationItem from './ListConversationItem'
import ListConversationMul from './ListConversationMul'

const ListConversationValues = [
	{
		id: 1,
		name: 'Cún Nè',
		image: 'https://joeschmoe.io/api/v1/random',
		lastTimeActive: '2days',
		isActive: false,
		lastMessage: 'Hello',
		createAt: 1665392787939,
	},
	{
		id: 2,
		name: 'Giang Nè',
		image: 'https://joeschmoe.io/api/v1/random',
		lastTimeActive: '2days',
		isActive: false,
		lastMessage: null,
		createAt: 1665392822075,
	},
	{
		id: 3,
		name: 'Chúa hề ',
		image: 'https://joeschmoe.io/api/v1/random',
		lastTimeActive: '2days',
		isActive: false,
		lastMessage: 'Hello mấy con đĩ',
		createAt: 1665392822075,
		isGroup: true,
	},
]

const ListConversation = () => {
	const [roomConvesation, setRoomConvesation] = useState<Room[]>()
	console.log('🚀 ~ file: index.tsx ~ line 42 ~ ListConversation ~ roomConvesation', roomConvesation)

	// SOCKET-CLIENTS HERE!!!
	/** Using socket and listen socket right here */

	useEffect(() => {
		;(async () => {
			try {
				const response = await roomApi.getRoomConversation()
				setRoomConvesation(response.data.rooms)
			} catch (err) {
				console.log(err)
				if (err) openNotificationWithIcon('error', 'Something wrong please contact an admin!!!')
			}
		})()
	}, [])

	ListConversationValues.sort((item1, item2) => {
		return item2.createAt - item1.createAt
	})

	return (
		<div className={styles.ListConversation}>
			<div className={styles.topContent}>
				<p className={styles.headerItem}>Yone Doan</p>
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
