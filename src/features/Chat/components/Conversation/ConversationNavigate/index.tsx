import { roomApi } from '@/api/roomApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { setConversationSelected } from '@/Chat/slices/ChatSlice'
import { InfoCircleFilled, InfoCircleOutlined, PushpinFilled, VideoCameraOutlined } from '@ant-design/icons'
import { Avatar, Carousel, Tooltip } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { useContext, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './ConversationNavigate.module.scss'
interface props {
	isClickInfo: boolean
	onClick: React.ReactEventHandler
}

const ConversationNavigate = ({ isClickInfo, onClick }: props) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const conversationSelected = useAppSelector((state) => state.chatSlice.conversationSelected)
	const conversations = useAppSelector((state) => state.chatSlice.conversations)

	const { inboxId } = useParams()
	const user = useAppSelector((state) => state.authSlice.user)

	useEffect(() => {
		if (!conversationSelected) {
			const conversation = conversations?.find((conversation) => {
				return conversation._id === inboxId
			})
			dispatch(setConversationSelected(conversation))
		}
	}, [conversations])

	const handleVideoCall = () => {
		// CallVideoID redirect here
		navigate(`/videoCall/${conversationSelected?._id}`)
	}

	const { image } =
		(conversationSelected &&
			(conversationSelected.users[0]._id === user?._id
				? conversationSelected.users[1]
				: conversationSelected.users[0])) ||
		{}

	return (
		<div className={styles.NavigateConversation}>
			<header className={styles.ListConversation__topContent}>
				{!isClickInfo && (
					<>
						<Link to={`/${conversationSelected?.users[0]._id}`}>
							<div className={styles.ListConversation__profile}>
								<Avatar
									size={26}
									src={
										conversationSelected?.group
											? conversationSelected?.avatar
											: image || 'https://joeschmoe.io/api/v1/random'
									}
									style={{ border: '1px solid rgb(219, 219, 219)' }}
								/>
								<div className={styles.item__content}>
									<p className={styles.item__contentName}>
										{conversationSelected?.group
											? conversationSelected?.name
											: conversationSelected?.users[0]._id === user?._id
											? conversationSelected?.users[1]?.name
											: conversationSelected?.users[0]?.name}
									</p>
									{conversationSelected?.active && <p>Active now</p>}
								</div>
							</div>
						</Link>
						<aside className={styles.ListConversation__action}>
							<>
								{/* <PhoneOutlined size={40} /> */}
								<VideoCameraOutlined size={40} onClick={handleVideoCall} />
								<InfoCircleOutlined size={40} onClick={onClick} />
							</>
						</aside>
					</>
				)}

				{isClickInfo && (
					<>
						<p></p>
						<p className={styles.headerName}>
							<Trans>CONVERSATION.DETAIL</Trans>
						</p>
						<aside className={styles.ListConversation__action}>
							<InfoCircleFilled onClick={onClick} />
						</aside>
					</>
				)}
			</header>

			{!isClickInfo && <ConversationNavigate.PinMessage></ConversationNavigate.PinMessage>}
		</div>
	)
}

interface pinMessage {
	message: string
	room: string //Id of Room,
	_id: string //Id of Pin Message
	type: string
}

interface DataPinUpdate {
	messagePin: pinMessage
	type: 'DELETE' | 'ADD'
}

ConversationNavigate.PinMessage = () => {
	const socket = useContext(SocketContext)
	if (!socket) return null
	const conversationSelected = useAppSelector((state) => state.chatSlice.conversationSelected)
	const { t } = useTranslation()
	const [allPinMessages, setAllPinMessages] = useState<pinMessage[]>([])

	const [updatePin, setUpdatePin] = useState<DataPinUpdate | null>(null)

	useEffect(() => {
		fetchAllPinMessages()
	}, [conversationSelected])

	useEffect(() => {
		socket.on('chat:update-pin-message', (dataGot) => {
			setUpdatePin(dataGot)
		})
	}, [])

	useEffect(() => {
		if (!updatePin) return
		if (updatePin.messagePin.room === conversationSelected?._id)
			if (updatePin.type === 'ADD') setAllPinMessages((pre) => [updatePin.messagePin, ...pre])
			else if (updatePin.type === 'DELETE')
				setAllPinMessages((pre) => pre.filter((pinMess) => pinMess._id !== updatePin.messagePin._id))

		setUpdatePin(null)
	}, [updatePin])

	const fetchAllPinMessages = async () => {
		if (conversationSelected) {
			const response = await roomApi.getAllPinMessages({ roomId: conversationSelected._id })
			const pinMessage = response.data.pinMessage.pinMessage
			setAllPinMessages(pinMessage)
		}
	}

	if (!allPinMessages || allPinMessages.length < 1) return null

	const handleUnpinMessage = (messageId: string, roomId: string) => {
		socket.emit('chat:delete-pin-message', { messageId, roomId })
	}

	return (
		<Carousel className={styles.pinMessage} dotPosition="right" effect="fade" autoplay>
			{allPinMessages.map((pinMessage) => (
				<div key={pinMessage._id}>
					<div className={styles.pinMessageItem}>
						{pinMessage.type === 'IMAGE' ? (
							<div className={styles.ImagePin}>
								<img src={pinMessage.message} height="50px" />
								<div>
									<p className={styles.titlePin}>{t('CONVERSATION.PINNED_MESSAGE')} :</p>
									<span>Image</span>
								</div>
							</div>
						) : (
							<div style={{ paddingTop: '10px' }}>
								<p className={styles.titlePin}>{t('CONVERSATION.PINNED_MESSAGE')} :</p>
								<span>{pinMessage.message}</span>
							</div>
						)}

						<span
							onClick={() => handleUnpinMessage(pinMessage._id, pinMessage.room)}
							className={styles.unPinIcon}
						>
							<Tooltip title={'UnPin Message'}>
								<PushpinFilled style={{ fontSize: 16 }} />
							</Tooltip>
						</span>
					</div>
				</div>
			))}
		</Carousel>
	)
}

ConversationNavigate.Skeleton = () => {
	return <header className={styles.ListConversation__topContent}>Loading</header>
}

export default ConversationNavigate
