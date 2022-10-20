import { InfoCircleFilled, InfoCircleOutlined, PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useState } from 'react'
import { Trans } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ConversationNavigate.module.scss'

interface props {
	isClickInfo: boolean
	onClick: React.ReactEventHandler
}

const ConversationNavigate = ({ isClickInfo, onClick }: props) => {
	const navigate = useNavigate()

	const handleVideoCall = () => {
		// CallVideoID redirect here
		navigate('/videoCall/123')
	}

	return (
		<header className={styles.ListConversation__topContent}>
			{!isClickInfo && (
				<>
					<Link to={`/123`}>
						<div className={styles.ListConversation__profile}>
							<Avatar
								size={26}
								src="https://joeschmoe.io/api/v1/random"
								style={{ border: '1px solid rgb(219, 219, 219)' }}
							/>
							<div className={styles.item__content}>
								<p className={styles.item__contentName}>Cún Nè</p>
								<p>Active now</p>
							</div>
						</div>
					</Link>
					<aside className={styles.ListConversation__action}>
						<>
							<PhoneOutlined size={40} />
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
