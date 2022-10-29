import { useParams } from 'react-router-dom'
import ConversationDisplay from './ConversationDisplay'
import ConversationEmpty from './ConversationEmpty'
import styles from './Conversition.module.scss'

const Conversation = () => {
	const { inboxId } = useParams()

	if (!inboxId)
		return (
			<div className={styles.conversation}>
				<ConversationEmpty />
			</div>
		)
	return (
		<div className={styles.conversation}>
			<ConversationDisplay />
		</div>
	)
}

export default Conversation
