import { messageApi } from '@/api/messageApi'
import { roomApi } from '@/api/roomApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { RootState } from '@/app/store'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import useOpen from '@/hooks/useOpen'
import { ReplyMessage } from '@/models/conversation'
import { Message } from '@/models/message'
import { handleNameFile } from '@/utils/file'
import {
	CloseOutlined,
	FileGifOutlined,
	FileImageOutlined,
	FileZipOutlined,
	LoadingOutlined,
	PaperClipOutlined,
} from '@ant-design/icons'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import { Dropdown, Form, Image, Input, Spin, Upload } from 'antd'
import axios from 'axios'
import { Suspense, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import TextMessage from '../../Messages/TextMessage'
import ConversationNavigate from '../ConversationNavigate'
import styles from './ConversationDisplay.module.scss'
import './ConversationDisplay.scss'

const socket = io('http://localhost:3000', {
	extraHeaders: {
		Authorization: JSON.parse(localStorage.getItem('loginData') || '{}')?.accessToken || '',
	},
}).connect()

console.log('Connect')

let tempMessage: Message[] = []

const ConversationDisplay = () => {
	const { t } = useTranslation()
	const { inboxId } = useParams()

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
		console.log('connect socket again')
		socket.on('chat:print_message', (dataGot) => {
			console.log('🚀 ~ file: index.tsx ~ line 58 ~ socket.on ~ dataGot', dataGot)
			setMessageRecive(dataGot)
			setDummyMessage('')
		})
	}, [])

	useEffect(() => {
		if (messageRecive.roomId === conversationSelected?._id && messagesConversation) {
			setMessageConversation((pre) => [...pre, messageRecive.message])
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

	const handleSendImage = async (e: any) => {
		const file = e.target.files[0]
		if (!conversationSelected) return

		let formData = await new FormData()
		formData.append('file', file)
		formData.append('username', conversationSelected?.users[0].username)
		formData.append('userId', conversationSelected?.users[0]?._id)
		formData.append('roomId', conversationSelected?._id)
		formData.append('type', 'IMAGE')

		const response = messageApi.uploadFile(formData)
	}

	const handleSendFile = async (e: any) => {
		const file = e.target.files[0]
		console.log('🚀 ~ file: index.tsx ~ line 142 ~ handleSendFile ~ file', file)
		if (!conversationSelected) return

		// let formData = await new FormData()
		// formData.append('file', file)
		// formData.append('username', conversationSelected?.users[0].username)
		// formData.append('userId', conversationSelected?.users[0]?._id)
		// formData.append('roomId', conversationSelected?._id)
		// formData.append('type', 'IMAGE')

		// const response = messageApi.uploadFile(formData)
	}

	return (
		<div className={styles.ListConversation}>
			<Suspense fallback={<ConversationNavigate.Skeleton />}>
				<ConversationNavigate isClickInfo={isClickInfo} onClick={toggleIsClickInfo} />

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
				</div>

				<main className={`${styles.mainContent} ${isClickInfo ? styles.hidden : styles.visible} `}>
					{/* Render msg in here */}
					<TextMessage>
						{/* <TextMessage.TimeMessage msg={'12:29 SA'} /> */}
						{messagesConversation &&
							messagesConversation.map((messageInfo, index) => {
								const nextMessage = messagesConversation[index + 1]
								const isPadding = messageInfo.type !== 'GIF' && messageInfo.type !== 'IMAGE'

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
										msg = <video></video>
										break
									default:
										msg = messageInfo.message
										break
								}

								if (messageInfo.sender === user?.username) {
									return <TextMessage.OwnerMessage msg={msg} ispadding={isPadding} key={index} />
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

				<Form onFinish={handleSendMessage} className={styles.sendInput}>
					<div className={styles.wrapInputItem}>
						{messageSender.trim().length < 1 && (
							<>
								<label htmlFor="image">
									<FileImageOutlined className={styles.iconAction} />
								</label>
								<input type="file" id="image" name="image" hidden onChange={handleSendImage} />

								<label htmlFor="file">
									<PaperClipOutlined className={styles.iconAction} />
								</label>
								<input type="file" id="file" name="file" onChange={handleSendFile} hidden />

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

ConversationDisplay.Typing = () => {
	// return <span style={{ fontSize: 12, padding: '0px 20px' }}>Typing time</span>
}

export default ConversationDisplay
