import { InfoCircleOutlined, PhoneOutlined, SmileOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Form, Input, Space } from 'antd'
import EmojiPicker from 'emoji-picker-react'
import { Link } from 'react-router-dom'
import styles from './ConversationDisplay.module.scss'

type FormValues = {
	message: ''
}

const ConversationDisplay = () => {
	const handleEmojiClick = (_: any, emoji: any) => {
		// console.log('🚀 ~ file: index.tsx ~ line 11 ~ handleEmojiClick ~ emoji', emoji)
		// setValue("message", message + )
	}
	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	return (
		<div className={styles.ListConversation}>
			<header className={styles.ListConversation__topContent}>
				<Link to={`/123`}>
					<div className={styles.ListConversation__profile}>
						<Avatar size="small" src="https://joeschmoe.io/api/v1/random" />
						<div className={styles.item__content}>
							<p className={styles.item__contentName}>Cún Nè</p>
							<p>Active now</p>
						</div>
					</div>
				</Link>
				<div className={styles.ListConversation__action}>
					<PhoneOutlined size={40} />
					<VideoCameraOutlined size={40} />
					<InfoCircleOutlined size={40} />
				</div>
			</header>
			<main className={styles.mainContent}>
				<div className={styles.wrapper}>
					<div className={styles.timeConversation}>June 29, 2022 9:07 pm</div>

					<div className={styles.ownerMessage}>
						<span>alooooo</span>
					</div>

					<div className={styles.blockMessage}>
						<Avatar size={24} src="https://joeschmoe.io/api/v1/random" />

						<div className={styles.friendMessage}>
							<span>sao vậy anh</span>
							<span>nghe nè anh zai</span>
						</div>
					</div>

					<div className={styles.ownerMessage}>
						<span>alooooo</span>
					</div>

					<div className={styles.blockMessage}>
						<Avatar size={24} src="https://joeschmoe.io/api/v1/random" />

						<div className={styles.friendMessage}>
							<span>sao vậy anh</span>
							<span>nghe nè anh zai</span>
						</div>
					</div>

					<div className={styles.timeConversation}>June 29, 2022 9:07 pm</div>

					<div className={styles.ownerMessage}>
						<span>alooooo</span>
					</div>

					<div className={styles.timeConversation}>June 29, 2022 9:07 pm</div>

					<div className={styles.ownerMessage}>
						<span>alooooo</span>
					</div>

					<div className={styles.blockMessage}>
						<Avatar size={24} src="https://joeschmoe.io/api/v1/random" />

						<div className={styles.friendMessage}>
							<span>sao vậy anh</span>
							<span>nghe nè anh zai</span>
						</div>
					</div>

					<div className={styles.ownerMessage}>
						<span>alooooo</span>
					</div>

					<div className={styles.blockMessage}>
						<Avatar size={24} src="https://joeschmoe.io/api/v1/random" />

						<div className={styles.friendMessage}>
							<span>sao vậy anh</span>
							<span>nghe nè anh zai</span>
						</div>
					</div>
				</div>
			</main>

			<Form onFinish={onFinish} className={styles.sendInput}>
				<Form.Item name="message">
					<Input
						className={styles.input}
						prefix={
							<div className={styles.relative}>
								<Dropdown overlay={<EmojiPicker onEmojiClick={handleEmojiClick} />} trigger={['click']}>
									<Space>
										<SmileOutlined className={styles.icon} />
									</Space>
								</Dropdown>
							</div>
						}
						placeholder="Message..."
						suffix={
							<button type="submit" className={styles.actions}>
								Send
							</button>
						}
					/>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ConversationDisplay
