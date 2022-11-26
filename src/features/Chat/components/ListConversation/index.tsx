import { roomApi } from '@/api/roomApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { openNotificationWithIcon } from '@/components/common/ToastMessage'
import { TeamOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { useContext, useEffect } from 'react'
import { setCloseCreateConversation, setConversations, setOpenCreateConversation } from '../..'
import ConversationModel from '../Conversation/ConversationModel'
import styles from './ListConversation.module.scss'
import ListConversationItem from './ListConversationItem'
import ListConversationMul from './ListConversationMul'

const ListConversation = () => {
	const dispatch = useAppDispatch()

	// const {pathname} = useLocation()

	const roomConvesation = useAppSelector((state) => state.chatSlice.conversations)

	const user = useAppSelector((state) => state.authSlice.user) || { name: 'Lochaading...' }
	const socket = useContext(SocketContext)

	// SOCKET-CLIENTS HERE!!!
	useEffect(() => {
		if (!socket) return

		socket.on('create-group', async () => {
			// GET ALL ROOM TO RENDER
			const responseRoom = await roomApi.getRoomConversation()
			dispatch(setConversations({ conversations: responseRoom.data.room || [] }))
			dispatch(setCloseCreateConversation())
		})

		socket.on('update-member', async (dataGot) => {
			const responseRoom = await roomApi.getRoomConversation()
			dispatch(setConversations({ conversations: responseRoom.data.room || [] }))
			// Update member here
			// dispatch(setConversationSelected(dataGot))
			dispatch(setCloseCreateConversation())
		})
	}, [socket])
	/** Using socket and listen socket right here */
	useEffect(() => {
		;(async () => {
			try {
				if (!roomConvesation) {
					const response = await roomApi.getRoomConversation()
					console.log('🚀 ~ file: index.tsx ~ line 50 ~ ; ~ response', response)
					dispatch(setConversations({ conversations: response.data.room || [] }))
				}
			} catch (err) {
				console.log('🚀 ~ file: index.tsx ~ line 28 ~ ; ~ err', err)
				if (err) openNotificationWithIcon('error', 'Something wrong please contact an admin!!!')
			}
		})()
	}, [])

	const open = useAppSelector((state) => state.chatSlice.openCreateConversation)
	const handleSetOpen = () => dispatch(setOpenCreateConversation())
	const handleSetClose = () => dispatch(setCloseCreateConversation())

	return (
		<div className={styles.ListConversation}>
			<ConversationModel open={open} onClose={handleSetClose} />
			<div className={styles.topContent}>
				<p className={styles.headerItem}>{user.name}</p>
				<span className={styles.makeConversation} onClick={() => handleSetOpen()}>
					<TeamOutlined />
				</span>
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
