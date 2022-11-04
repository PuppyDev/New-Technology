import { useAppDispatch } from '@/app/hook'
import { setOpenCreateConversation } from '@/Chat/slices/ChatSlice'
import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import styles from './ConversationEmpty.module.scss'

const ConversationEmpty = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const handleSetOpen = () => dispatch(setOpenCreateConversation())
	return (
		<div className={styles.conversation}>
			<div className={styles.conversation__icon}>
				<SendOutlined />
			</div>
			<p>{t('CONVERSATION.YOUR_MESSAGE')}</p>
			<h3>{t('CONVERSATION.SUB_YOUR_MESSAGE')}</h3>
			<Button type="primary" onClick={handleSetOpen}>
				{t('CONVERSATION.SEND_MESSAGE')}
			</Button>
		</div>
	)
}

export default ConversationEmpty
