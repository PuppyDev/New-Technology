import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import styles from './ConversationEmpty.module.scss'

const ConversationEmpty = () => {
	return (
		<div className={styles.conversation}>
			<div className={styles.conversation__icon}>
				<SendOutlined />
			</div>
			<p>Your messages</p>
			<h3>Send private photos and messages to a friend or group.</h3>
			<Button type="primary">Send message</Button>
		</div>
	)
}

export default ConversationEmpty
