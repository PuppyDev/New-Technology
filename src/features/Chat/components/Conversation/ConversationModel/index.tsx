import { Avatar, Checkbox, Modal } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import styles from './ConversationModel.module.scss'
import './ConversationModel.scss'
const ConversationModel = ({ open, onClose }: { open: boolean; onClose: any }) => {
	const { t } = useTranslation()

	return (
		<Modal
			title={<div className={styles.titleModal}>{t('CONVERSATION.NEW_MESSAGE')}</div>}
			centered
			open={open}
			onCancel={() => onClose()}
			className={styles.modal}
			footer={null}
			closable={true}
		>
			<div className={styles.modal__content}>
				<div className={styles.modal__content_search}>
					<span>{t('CONVERSATION.TO')} </span>

					<input type="text" placeholder={t('SEARCH') + '...'} />
				</div>
				<div className={styles.modal__content_result}>
					<p>{t('SUGGESTED')}</p>

					<ConversationModel.ListUser>
						<ConversationModel.UserItem />
						<ConversationModel.UserItem />
						<ConversationModel.UserItem />
					</ConversationModel.ListUser>
				</div>
			</div>
		</Modal>
	)
}

ConversationModel.UserItem = () => {
	return (
		<div className={styles.user__content}>
			<Avatar
				size={44}
				src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n6XggU8IoyXc8EhpP_RCWQHaJ4%26pid%3DApi&f=1&ipt=d574ab411b8252309b7f81676e6b2224a176b8335d03a4828ecce68bf715ce34&ipo=images"
			/>

			<div className={styles.user__content_detail}>
				<span className={styles.username}>penguin_ss</span>
				<p className={styles.fullname}>Giang vo</p>
			</div>

			<Checkbox className={styles.checkbox} value="123" />
		</div>
	)
}

ConversationModel.ListUser = ({ children }: { children: React.ReactNode }) => {
	const onChange = (checkedValues: CheckboxValueType[]) => {
		console.log('checked = ', checkedValues)
	}
	return (
		<Checkbox.Group onChange={onChange} style={{ width: '100%' }}>
			{children}
		</Checkbox.Group>
	)
}

export default ConversationModel
