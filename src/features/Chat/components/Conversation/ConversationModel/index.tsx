import useDebounce from '@/hooks/useDebounce'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Modal, Spin } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ConversationModel.module.scss'
import './ConversationModel.scss'

const ConversationModel = ({ open, onClose }: { open: boolean; onClose: any }) => {
	const { t } = useTranslation()

	const [usernameInput, setuserNameInput] = useState('')

	const valueSearch = useDebounce(usernameInput, 1000)

	const [selectUser, setSelectUser] = useState<any>([])

	const [loading, setLoading] = useState(false)
	const [listFriend, setListFriend] = useState([])
	useEffect(() => {
		setLoading(true)
		;(async () => {
			try {
				// // Call API to get all friend in here
				// const response = await setTimeout(() => {
				// 	return Promise.resolve(12)
				// }, 10000)
				// console.log('🚀 ~ file: index.tsx ~ line 21 ~ ; ~ response', response)
			} catch (err) {
				console.log('🚀 ~ file: index.tsx ~ line 23 ~ ; ~ err', err)
			} finally {
				// setLoading(false)
			}
		})()
	}, [valueSearch])

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
					<div className={styles.modal__content_search_top}>
						<span>{t('CONVERSATION.TO')} </span>
						<input
							type="text"
							placeholder={t('SEARCH') + '...'}
							onChange={(e) => setuserNameInput(e.target.value)}
						/>
					</div>

					<ul className={styles.modal__content_search_seekResult}>
						{selectUser &&
							selectUser.map((item: any) => {
								console.log('🚀 ~ file: index.tsx ~ line 34 ~ selectUser.map ~ item', item)
								return (
									<li>
										Giang vo{' '}
										<span
											onClick={() => {
												console.log('2 3 con muwcj')
											}}
										>
											<CloseCircleOutlined />
										</span>
									</li>
								)
							})}
					</ul>
				</div>
				<div className={styles.modal__content_result}>
					<p>{t('SUGGESTED')}</p>

					<ConversationModel.ListUser
						onChange={(checkedValues: CheckboxValueType[]) => setSelectUser(checkedValues)}
					>
						{listFriend &&
							listFriend.map((item, index) => (
								<ConversationModel.UserItem key={index} value={'' + index} />
							))}

						{loading && (
							<div className={styles.spinLoading}>
								<Spin />
							</div>
						)}

						{listFriend.length < 1 && !loading && (
							<p>You don't have any friend please add friend using search</p>
						)}
					</ConversationModel.ListUser>
				</div>
			</div>
		</Modal>
	)
}

ConversationModel.UserItem = ({ value }: { value: String }) => {
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

			<Checkbox className={styles.checkbox} value={value} />
		</div>
	)
}

ConversationModel.ListUser = ({ children, onChange }: { children: React.ReactNode; onChange: any }) => {
	return (
		<Checkbox.Group
			onChange={(checkedValues: CheckboxValueType[]) => onChange(checkedValues)}
			style={{ width: '100%' }}
		>
			{children}
		</Checkbox.Group>
	)
}

export default ConversationModel
