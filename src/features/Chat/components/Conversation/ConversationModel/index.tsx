import { roomApi } from '@/api/roomApi'
import { userApi } from '@/api/userApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { setCloseCreateConversation, setConversations } from '@/Chat/slices/ChatSlice'
import useDebounce from '@/hooks/useDebounce'
import { User } from '@/models/user'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, Modal, Spin } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { SocketContext } from 'context/SocketContext'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ConversationModel.module.scss'
import './ConversationModel.scss'

const ConversationModel = ({
	open,
	onClose,
	userInConversation,
}: {
	open: boolean
	onClose: any
	userInConversation?: User[]
}) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const user = useAppSelector((state) => state.authSlice.user)
	const conversationSelected = useAppSelector((state) => state.chatSlice.conversationSelected)

	const [usernameInput, setuserNameInput] = useState('')
	const socket = useContext(SocketContext)
	const valueSearch = useDebounce(usernameInput, 1000)

	const [selectUser, setSelectUser] = useState<String[]>(
		() => userInConversation?.filter((userInfo) => userInfo._id !== user?._id).map((userInfo) => userInfo._id) || []
	)

	const [loading, setLoading] = useState(false)
	const [listFriend, setListFriend] = useState<User[]>([])

	useEffect(() => {
		setLoading(true)
		;(async () => {
			try {
				// Call API to get all friend in here
				const response = await userApi.getAllFriend()
				setListFriend(response.data.friends)
			} catch (err) {
				console.log('🚀 ~ file: index.tsx ~ line 23 ~ ; ~ err', err)
			} finally {
				setLoading(false)
			}
		})()
	}, [valueSearch])

	const [loadingCreate, setLoadingCreate] = useState(false)
	const handleCreateGroup = async () => {
		if (!socket) return

		try {
			setLoadingCreate(true)
			const newGroup = {
				name: 'Chat Group ',
				userIds: selectUser,
			}
			const response = await roomApi.createGroupRoom(newGroup)
			console.log('🚀 ~ file: index.tsx ~ line 63 ~ handleCreateGroup ~ response', response)

			socket.emit('room:join_group', response.data)

			// GET ALL ROOM TO RENDER
			const responseRoom = await roomApi.getRoomConversation()
			dispatch(setConversations({ conversations: responseRoom.data.room || [] }))
			dispatch(setCloseCreateConversation())
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 48 ~ handleCreateGroup ~ err', err)
		}
		setLoadingCreate(false)
	}

	const handleRemoveUserGroup = (_id: string) => {
		const newArr = selectUser.filter((userId) => userId !== _id)
		setSelectUser(newArr)
	}

	const handleAddUserToGroup = () => {
		if (!socket) return
		try {
			setLoadingCreate(true)
			const newUSerId: String[] =
				selectUser.filter((user) => !userInConversation?.find((member) => member._id === user)) || []
			socket.emit('room:add_member', {
				roomId: conversationSelected?._id,
				userId: user?._id,
				newUSerId,
			})
			setSelectUser(
				userInConversation?.filter((userInfo) => userInfo._id !== user?._id).map((userInfo) => userInfo._id) ||
					[]
			)
			onClose()
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 98 ~ handleAddUserToGroup ~ err', err)
		}

		setLoadingCreate(false)
	}

	return (
		<Modal
			title={
				<div className={styles.titleModal}>
					{selectUser && selectUser.length >= 2 && !userInConversation && (
						<span onClick={handleCreateGroup} className={styles.titleNext}>
							{loadingCreate ? <Spin /> : 'Create'}
						</span>
					)}

					{userInConversation && userInConversation?.length <= selectUser.length && (
						<span onClick={handleAddUserToGroup} className={styles.titleNext}>
							{loadingCreate ? <Spin /> : 'Add'}
						</span>
					)}

					{t('CONVERSATION.NEW_MESSAGE')}
				</div>
			}
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
							selectUser.map((idUser: String) => {
								if (idUser) {
									const member = listFriend.find((member) => member._id === idUser)
									const duplicatedUser =
										userInConversation &&
										userInConversation.find((user) => user._id === member?._id)
									if (member)
										return (
											<li key={member._id}>
												{member.name}
												{!duplicatedUser && (
													<span onClick={() => handleRemoveUserGroup(member._id)}>
														<CloseCircleOutlined />
													</span>
												)}
											</li>
										)
								}
								return
							})}
					</ul>
				</div>
				<div className={styles.modal__content_result}>
					<p>{t('SUGGESTED')}</p>

					<ConversationModel.ListUser
						selectUser={selectUser}
						onChange={(checkedValues: any) => setSelectUser(checkedValues)}
					>
						{listFriend &&
							listFriend.map((item, index) => (
								<ConversationModel.UserItem
									key={index}
									userInfo={item}
									duplicated={
										userInConversation &&
										!!userInConversation.find((user) => user._id === item?._id)
									}
								/>
							))}

						{loading && (
							<div className={styles.spinLoading}>
								<Spin />
							</div>
						)}

						{listFriend.length < 1 && !loading && (
							<p>You don't have any friend please add friend before using search feature</p>
						)}
					</ConversationModel.ListUser>
				</div>
			</div>
		</Modal>
	)
}

ConversationModel.UserItem = ({ userInfo, duplicated = false }: { userInfo: User; duplicated?: boolean }) => {
	return (
		<div className={styles.user__content}>
			<Avatar size={44} src={userInfo.image} />

			<div className={styles.user__content_detail}>
				<span className={styles.username}>{userInfo.username}</span>
				<p className={styles.fullname}>{userInfo.name}</p>
			</div>

			<Checkbox className={styles.checkbox} value={userInfo._id} disabled={duplicated} />
		</div>
	)
}

ConversationModel.ListUser = ({
	children,
	onChange,
	selectUser,
}: {
	children: React.ReactNode
	onChange: any
	selectUser: any
}) => {
	return (
		<Checkbox.Group
			onChange={(checkedValues: CheckboxValueType[]) => onChange(checkedValues)}
			style={{ width: '100%' }}
			value={selectUser}
		>
			{children}
		</Checkbox.Group>
	)
}

export default ConversationModel
