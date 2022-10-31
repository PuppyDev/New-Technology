import { useAppDispatch, useAppSelector } from '@/app/hook'
import { setConversationSelected } from '@/Chat/slices/ChatSlice'
import { InfoCircleFilled, InfoCircleOutlined, PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useEffect } from 'react'
import { Trans } from 'react-i18next'
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

	return (
		<header className={styles.ListConversation__topContent}>
			{!isClickInfo && (
				<>
					<Link to={`/${conversationSelected?.users[0]._id}`}>
						<div className={styles.ListConversation__profile}>
							<Avatar
								size={26}
								src={conversationSelected?.avatar || 'https://joeschmoe.io/api/v1/random'}
								style={{ border: '1px solid rgb(219, 219, 219)' }}
							/>
							<div className={styles.item__content}>
								<p className={styles.item__contentName}>{conversationSelected?.users[0].name}</p>
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
	)
}

ConversationNavigate.Skeleton = () => {
	return <header className={styles.ListConversation__topContent}>Loading</header>
}

export default ConversationNavigate
