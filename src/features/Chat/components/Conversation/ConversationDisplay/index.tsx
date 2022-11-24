import { messageApi } from '@/api/messageApi'
import { roomApi } from '@/api/roomApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { RootState } from '@/app/store'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import useIconFile from '@/hooks/useIconFile'
import useOpen from '@/hooks/useOpen'
import { ReplyMessage } from '@/models/conversation'
import { Message, messageType } from '@/models/message'
import { Room } from '@/models/room'
import { handleNameFile } from '@/utils/file'
import {
	CloseOutlined,
	DashOutlined,
	DownloadOutlined,
	FileGifOutlined,
	FileImageOutlined,
	FileZipOutlined,
	KeyOutlined,
	LoadingOutlined,
	PaperClipOutlined,
} from '@ant-design/icons'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import { Avatar, Button, Col, Collapse, Dropdown, Form, Image, Input, Menu, Row, Spin } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { Suspense, useContext, useEffect, useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'
import { Link, useNavigate } from 'react-router-dom'
import TextMessage from '../../Messages/TextMessage'
import ConversationModel from '../ConversationModel'
import ConversationNavigate from '../ConversationNavigate'
import styles from './ConversationDisplay.module.scss'
import './ConversationDisplay.scss'

let tempMessage: Message[] = []

const ConversationDisplay = () => {
	const { t } = useTranslation()
	const socket = useContext(SocketContext)

	if (!socket) return

	const conversationSelected = useAppSelector((state) => state.chatSlice.conversationSelected)
	const user = useAppSelector((state) => state.authSlice.user)
	// Display details
	const { open: isClickInfo, handleToggleOpen: toggleIsClickInfo } = useOpen()
	const [messageSender, setMessageSender] = useState<string>('')
	const [isLoadingMessages, setIsLoadingMessages] = useState(true)
	// Display reply message
	const replyMessage = useAppSelector((state: RootState) => state.chatSlice.replyMessage)

	const [dummyMessage, setDummyMessage] = useState<String>('')

	const [messagesConversation, setMessageConversation] = useState<Message[]>()
	const [messageRecive, setMessageRecive] = useState<any>('')
	// Subcriber Socket msg in here
	useEffect(() => {
		socket.on('chat:print_message', (dataGot) => {
			console.log('🚀 ~ file: index.tsx ~ line 61 ~ socket.on ~ dataGot', dataGot)
			setMessageRecive(dataGot)
			setDummyMessage('')
		})
	}, [])

	useEffect(() => {
		if (messageRecive.roomId === conversationSelected?._id && messagesConversation) {
			setMessageConversation((pre) => [...(pre as Message[]), messageRecive.message])
		}
	}, [messageRecive])

	// Get Message using api
	useEffect(() => {
		if (!conversationSelected) return

		const { _id } = conversationSelected.users[0]

		;(async () => {
			const response = await roomApi.getMessageInRoom({
				roomId: conversationSelected._id,
				nMessage: 10,
				userId: _id,
			})
			setIsLoadingMessages(false)
			setMessageConversation(response.data.messages)
		})()
	}, [conversationSelected?._id])

	const handleSendMessage = (values?: string) => {
		const newValues: string = messageSender

		socket.emit('chat:send_message', {
			username: conversationSelected?.users[0].username,
			userId: conversationSelected?.users[0]?._id,
			roomId: conversationSelected?._id,
			content: newValues,
		})

		setDummyMessage(messageSender)
		setMessageSender('')
	}

	// GIF handle
	const [keyword, setkeyword] = useState('')
	const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
	const fetchGifs = () => {
		giphyFetch.trending({ limit: 10 })
		if (keyword === '') {
			return giphyFetch.trending({ limit: 20 })
		}
		return giphyFetch.search(keyword, { limit: 20 })
	}

	const onSearch = (value: string) => setkeyword(value)

	const sendGifHandler = (gif: any) => {
		const url_gif = gif.images.preview_webp.url || gif.images.preview_gif.url

		socket.emit('chat:send_message', {
			username: conversationSelected?.users[0].username,
			userId: conversationSelected?.users[0]?._id,
			roomId: conversationSelected?._id,
			content: url_gif,
			type: 'GIF',
		})
	}

	// SEnd all of type file | imgae | video
	const handleSendImage = async (e: any, type?: messageType) => {
		const file = e.target.files[0]
		const fileExt = file.name.split('.')[1]
		const fileType = type ? type : fileExt == 'mp4' || fileExt === 'mp3' ? 'VIDEO' : 'IMAGE'
		if (!conversationSelected) return

		setDummyMessage('Message is sending...')

		let formData = await new FormData()
		formData.append('file', file)
		formData.append('username', conversationSelected?.users[0].username)
		formData.append('userId', conversationSelected?.users[0]?._id)
		formData.append('roomId', conversationSelected?._id)
		formData.append('type', fileType)

		const response = await messageApi.uploadFile(formData)
		setMessageRecive(response.data)
		setDummyMessage('')
		socket.emit('chat:send_image', response?.data)
	}

	return (
		<div className={styles.ListConversation}>
			<Suspense fallback={<ConversationNavigate.Skeleton />}>
				<ConversationNavigate isClickInfo={isClickInfo} onClick={toggleIsClickInfo} />

				<ConversationDisplay.DetailsConversation
					isClickInfo={isClickInfo}
					dataMessages={messagesConversation || []}
				/>

				<main className={`${styles.mainContent} ${isClickInfo ? styles.hidden : styles.visible} `}>
					{/* Render msg in here */}
					<TextMessage>
						{/* <TextMessage.TimeMessage msg={'12:29 SA'} /> */}
						{messagesConversation &&
							messagesConversation.map((messageInfo, index) => {
								const nextMessage = messagesConversation[index + 1]
								const isPadding =
									messageInfo.type !== 'GIF' &&
									messageInfo.type !== 'IMAGE' &&
									messageInfo.type !== 'VIDEO'

								let msg: any
								switch (messageInfo.type) {
									case 'GIF':
										msg = <img src={messageInfo.message} />
										break
									case 'IMAGE':
										msg = <Image src={messageInfo.message} />
										break
									case 'FILE':
										msg = (
											<a href={messageInfo.message} download style={{ fontSize: 18 }}>
												<FileZipOutlined size={40} /> {handleNameFile(messageInfo.message)}
											</a>
										)
										break
									case 'VIDEO':
										msg = (
											<video width="100%" controls>
												<source src={messageInfo.message} type="video/mp4"></source>
											</video>
										)
										break
									default:
										msg = messageInfo.message
										break
								}

								if (messageInfo.type === 'NOTIFY')
									return <TextMessage.TimeMessage msg={msg} key={messageInfo._id} />

								if (messageInfo.sender === user?.username) {
									return (
										<TextMessage.OwnerMessage
											messageObj={messageInfo}
											msg={msg}
											ispadding={isPadding}
											key={messageInfo._id}
										/>
									)
								}
								// else if (nextMessage?.sender === messageInfo?.sender) {
								// 	tempMessage.push(messageInfo)

								// 	return
								// } else if (nextMessage?.sender !== user?.username) {
								// 	tempMessage.push(messageInfo)

								// 	const contentMessageBlock = (
								// 		<TextMessage.ListFriendMessage key={index}>
								// 			{tempMessage &&
								// 				tempMessage?.map((messageFriend) => (
								// 					<TextMessage.FriendMessage
								// 						msg={messageFriend.message}
								// 						key={messageFriend._id}
								// 					/>
								// 				))}
								// 		</TextMessage.ListFriendMessage>
								// 	)

								// 	tempMessage = []
								// 	return contentMessageBlock
								// }

								return (
									<TextMessage.ListFriendMessage key={index}>
										<TextMessage.FriendMessage
											messageObj={messageInfo}
											msg={msg}
											key={messageInfo._id}
											ispadding={isPadding}
										/>
									</TextMessage.ListFriendMessage>
								)
							})}
						{dummyMessage && <TextMessage.OwnerMessage msg={dummyMessage} loading />}
					</TextMessage>

					{isLoadingMessages && <ConversationDisplay.Skeleton />}
				</main>

				<ConversationDisplay.ReplyDialog replyMessage={replyMessage} />

				<Form onFinish={handleSendMessage} className={`${styles.sendInput} ${isClickInfo && styles.hidden}`}>
					<div className={styles.wrapInputItem}>
						{messageSender.trim().length < 1 && (
							<>
								<label htmlFor="image">
									<FileImageOutlined className={styles.iconAction} />
								</label>
								<input
									type="file"
									id="image"
									name="image"
									hidden
									onChange={(e) => handleSendImage(e)}
								/>

								<label htmlFor="file">
									<PaperClipOutlined className={styles.iconAction} />
								</label>
								<input
									type="file"
									id="file"
									name="file"
									onChange={(e) => handleSendImage(e, 'FILE')}
									hidden
								/>

								<Dropdown
									overlay={
										<div className={styles.wrapGif}>
											<div className={styles.middle}>
												<div className={styles.search}>
													<Input.Search
														onSearch={onSearch}
														placeholder={t('CONVERSATION.SEARCH_GIF')}
													/>
												</div>
											</div>
											<div className={styles.gifStyle}>
												<Grid
													width={310}
													columns={1}
													fetchGifs={fetchGifs}
													onGifClick={sendGifHandler}
													key={keyword}
													noLink
												/>
											</div>
										</div>
									}
									trigger={['click']}
									placement="topLeft"
									destroyPopupOnHide
								>
									<FileGifOutlined className={styles.iconAction} />
								</Dropdown>
							</>
						)}
						<InputEmoji
							value={messageSender}
							name="message"
							onChange={setMessageSender}
							cleanOnEnter
							onEnter={handleSendMessage}
							placeholder={`${t('CONVERSATION.MESSAGE')}`}
							theme="light"
							className={styles.inputEmoji}
							onKeyDown={() => {
								/** Subcriber socket listen key typing in here */
								// console.log('vo')
							}}
						/>
						{messageSender.trim().length >= 1 && (
							<button type="submit" className={styles.actions}>
								<Trans>SEND</Trans>
							</button>
						)}
					</div>
				</Form>
			</Suspense>
		</div>
	)
}

ConversationDisplay.ReplyDialog = ({ replyMessage }: { replyMessage: ReplyMessage }) => {
	// config dispatch
	const dispatch = useAppDispatch()

	const { t } = useTranslation()

	if (!replyMessage.msg) return null

	return (
		<section className={styles.reply__action}>
			<div>
				<p className={styles.reply__action_header}>
					{t('CONVERSATION.REPLY')} {replyMessage.replyFor ? replyMessage.replyFor : t('CONVERSATION.MINE')}
				</p>
				<p className={styles.reply__action_content}>{replyMessage.msg}</p>
			</div>
			<CloseOutlined
				className={styles.closeBtn}
				onClick={() =>
					dispatch(
						setReplyMessage({
							replyMessage: {
								msg: null,
								replyFor: null,
								_id: null,
							},
						})
					)
				}
			/>
		</section>
	)
}

ConversationDisplay.Skeleton = () => {
	return (
		<div className={styles.skeleton}>
			<Spin size="large" indicator={<LoadingOutlined />} />
		</div>
	)
}

const { Panel } = Collapse
ConversationDisplay.DetailsConversation = ({
	isClickInfo,
	dataMessages,
}: {
	isClickInfo: boolean
	dataMessages: Message[]
}) => {
	const imageVideoList = useMemo(() => {
		return dataMessages.filter((message) => ['IMAGE', 'VIDEO'].includes(message.type))
	}, [dataMessages])

	const fileList = useMemo(() => {
		return dataMessages.filter((message) => ['FILE'].includes(message.type))
	}, [dataMessages])

	const { open, handleSetClose, handleSetOpen } = useOpen()

	const userInfo = useAppSelector((state) => state.authSlice.user)
	const socket = useContext(SocketContext)

	const conversationSelected = useAppSelector((state) => state.chatSlice.conversationSelected)

	const navigate = useNavigate()

	const handleLeaveChat = () => {
		if (!socket) return
		socket.emit('room:leave_group', { roomId: conversationSelected?._id, userId: userInfo?._id })
		navigate('/direct/inbox')
	}

	const handleRemoveUserGroup = (userId: string) => {
		if (!socket) return
		socket.emit('handleRemoveUserGroup', {
			roomId: conversationSelected?._id,
			managerId: userInfo?._id,
			userId,
			usernameManager: userInfo?.username,
		})
	}

	return (
		<div className={`${styles.detail} ${isClickInfo ? styles.visible : styles.hidden} `}>
			<ul className={styles.detail__action}>
				<li onClick={() => console.log('vo')}>
					<Trans>CONVERSATION.DETAIL_ACTION.DELETE_CHAT</Trans>
				</li>
				<li>
					<Trans>CONVERSATION.DETAIL_ACTION.BLOCK</Trans>
				</li>
				<li>
					<Trans>CONVERSATION.DETAIL_ACTION.REPORT</Trans>
				</li>
			</ul>
			<Collapse
				defaultActiveKey={['3', '2']}
				expandIconPosition="end"
				style={{ userSelect: 'none', paddingLeft: '5px', paddingRight: '5px' }}
				ghost
			>
				{conversationSelected?.group && (
					<Panel
						header={
							<b>
								<Trans>CONVERSATION.MEMBERS_GROUP</Trans>
							</b>
						}
						key="3"
					>
						<Row align="middle" justify="center" style={{ marginBottom: '20px' }}>
							<Button type="primary" onClick={handleSetOpen}>
								<Trans>CONVERSATION.ADD_MEMBER</Trans>
							</Button>
						</Row>
						<Row>
							{conversationSelected.users.map((user) => (
								<Col key={user._id} className={styles.userItem}>
									<Link to={`/${user._id}`} className={styles.userInGroup}>
										<Avatar
											size={50}
											src={conversationSelected?.avatar || 'https://joeschmoe.io/api/v1/random'}
											style={{ border: '1px solid rgb(219, 219, 219)' }}
										/>
										<div className={styles.item__content}>
											<p className={styles.item__contentName}>{user.name}</p>
											{conversationSelected.roomMaster?.includes(user._id) && (
												<span>
													<KeyOutlined /> <Trans>CONVERSATION.ADMIN</Trans>
												</span>
											)}
										</div>
									</Link>

									{/* Have master key  */}
									{userInfo && conversationSelected.roomMaster?.includes(userInfo._id) && (
										<section className={styles.ml_auto}>
											<Dropdown
												className={styles.userItem_action}
												overlay={
													<Menu
														items={
															!conversationSelected.roomMaster?.includes(user._id)
																? [
																		{
																			key: '1',
																			label: (
																				<div>
																					<Trans>
																						CONVERSATION.MAKE_ADMIN
																					</Trans>
																				</div>
																			),
																		},
																		{
																			key: '2',
																			label: (
																				<div
																					onClick={() =>
																						handleRemoveUserGroup(user._id)
																					}
																				>
																					<Trans>
																						CONVERSATION.REMOVE_FROM_GROUP
																					</Trans>
																				</div>
																			),
																		},
																  ]
																: [
																		{
																			key: '1',
																			label: (
																				<div onClick={handleLeaveChat}>
																					<Trans>
																						CONVERSATION.LEAVE_CHAT
																					</Trans>
																				</div>
																			),
																		},
																  ]
														}
														className={styles.menu}
													/>
												}
												placement="bottomRight"
												arrow={{ pointAtCenter: true }}
												trigger={['click']}
											>
												<DashOutlined />
											</Dropdown>
										</section>
									)}

									{userInfo &&
										!conversationSelected.roomMaster?.includes(userInfo._id) &&
										user._id === userInfo._id && (
											<section className={styles.ml_auto}>
												<Dropdown
													className={styles.userItem_action}
													overlay={
														<Menu
															items={[
																{
																	key: '1',
																	label: (
																		<div onClick={handleLeaveChat}>
																			<Trans>CONVERSATION.LEAVE_CHAT</Trans>
																		</div>
																	),
																},
															]}
															className={styles.menu}
														/>
													}
													placement="bottomRight"
													arrow={{ pointAtCenter: true }}
													trigger={['click']}
												>
													<DashOutlined />
												</Dropdown>
											</section>
										)}
								</Col>
							))}
						</Row>
						<ConversationModel
							open={open}
							onClose={handleSetClose}
							userInConversation={conversationSelected.users}
						/>
					</Panel>
				)}

				<Panel header={<b>Ảnh/Video</b>} key="1">
					<Row gutter={[16, 16]}>
						<Image.PreviewGroup>
							{imageVideoList.length > 0 &&
								imageVideoList.map((messageInfo, index) => (
									<Col className="gutter-row gutter-coloumn" span={6} key={messageInfo._id}>
										{messageInfo.type === 'IMAGE' ? (
											<Image
												src={messageInfo.message}
												style={{ width: '100%', height: '150px', objectFit: 'cover' }}
											/>
										) : (
											<video width="100%" height={150} controls>
												<source src={messageInfo.message} type="video/mp4"></source>
											</video>
										)}
									</Col>
								))}
						</Image.PreviewGroup>
					</Row>
				</Panel>

				<Panel header={<b>File</b>} key="2">
					<Row>
						{fileList.map((messageInfo) => {
							return (
								<Col span={24} key={messageInfo._id}>
									<a href={messageInfo.message} download className={styles.fileBlock}>
										{useIconFile(messageInfo.message)} {handleNameFile(messageInfo.message)}
										<DownloadOutlined className={styles.iconDown} />
									</a>
								</Col>
							)
						})}
					</Row>
				</Panel>
			</Collapse>
		</div>
	)
}

ConversationDisplay.Typing = () => {
	// return <span style={{ fontSize: 12, padding: '0px 20px' }}>Typing time</span>
}

export default ConversationDisplay
