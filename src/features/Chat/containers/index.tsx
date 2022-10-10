import React from 'react'
import Conversation from '../components/Conversation'
import ListConversation from '../components/ListConversation'

import styles from './ChatContainer.module.scss'

const ChatContainer = () => {
	return (
		<div className={styles.container}>
			<ListConversation />
			<Conversation />
		</div>
	)
}

export default ChatContainer
