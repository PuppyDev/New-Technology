import useOpen from '@/hooks/useOpen'
import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import ConversationModel from '../ConversationModel'

import styles from './ConversationEmpty.module.scss'

const ConversationEmpty = () => {
	const { open, setOpen, handleSetOpen, handleSetClose } = useOpen()

	const { t } = useTranslation()

	return (
		<div className={styles.conversation}>
			<div className={styles.conversation__icon}>
				<SendOutlined />
			</div>
			<ConversationModel open={open} onClose={handleSetClose} />
			<p>{t('CONVERSATION.YOUR_MESSAGE')}</p>
			<h3>{t('CONVERSATION.SUB_YOUR_MESSAGE')}</h3>
			<Button type="primary" onClick={handleSetOpen}>
				{t('CONVERSATION.SEND_MESSAGE')}
			</Button>
		</div>
	)
}

export default ConversationEmpty
