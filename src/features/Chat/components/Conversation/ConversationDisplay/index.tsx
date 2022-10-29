import { messageApi } from '@/api/messageApi'
import { roomApi } from '@/api/roomApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { RootState } from '@/app/store'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import useOpen from '@/hooks/useOpen'
import { ReplyMessage } from '@/models/conversation'
import { Message, messageType } from '@/models/message'
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
import { Col, Collapse, Dropdown, Form, Image, Input, Row, Spin } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { Suspense, useContext, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'
import TextMessage from '../../Messages/TextMessage'
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

				<ConversationDisplay.DetailsConversation isClickInfo={isClickInfo} />

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

								if (messageInfo.sender === user?.username) {
									return (
										<TextMessage.OwnerMessage
											messageObj={messageInfo}
											msg={msg}
											ispadding={isPadding}
											key={index}
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
ConversationDisplay.DetailsConversation = ({ isClickInfo }: { isClickInfo: boolean }) => {
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
				defaultActiveKey={['1', '2']}
				expandIconPosition="end"
				style={{ userSelect: 'none', paddingLeft: '5px', paddingRight: '5px' }}
				ghost
			>
				<Panel header="Ảnh/Video " key="1">
					<p>Meo meo</p>
				</Panel>
				<Panel header="File" key="2">
					<Image.PreviewGroup>
						<Row gutter={16}>
							<Col className="gutter-row" span={6}>
								<Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n6XggU8IoyXc8EhpP_RCWQHaJ4%26pid%3DApi&f=1&ipt=bd62ca8caccfe33cddd1290aa37fe0ca3f334fb5416bebcb9f7e4ecc76362da4&ipo=images" />
							</Col>
							<Col className="gutter-row" span={6}>
								<Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n6XggU8IoyXc8EhpP_RCWQHaJ4%26pid%3DApi&f=1&ipt=bd62ca8caccfe33cddd1290aa37fe0ca3f334fb5416bebcb9f7e4ecc76362da4&ipo=images" />
							</Col>
							<Col className="gutter-row" span={6}>
								<Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.n6XggU8IoyXc8EhpP_RCWQHaJ4%26pid%3DApi&f=1&ipt=bd62ca8caccfe33cddd1290aa37fe0ca3f334fb5416bebcb9f7e4ecc76362da4&ipo=images" />
							</Col>
							<Col className="gutter-row" span={6}>
								<Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.HR_QAr5KgVT_TmLNrnF1rgHaKx%26pid%3DApi&f=1&ipt=78ec0579f91f9aca37c0fcf5fbfeb5eadf87173f9f3d302507f86c3467280934&ipo=images" />
							</Col>
							<Col className="gutter-row" span={6}>
								<Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.HR_QAr5KgVT_TmLNrnF1rgHaKx%26pid%3DApi&f=1&ipt=78ec0579f91f9aca37c0fcf5fbfeb5eadf87173f9f3d302507f86c3467280934&ipo=images" />
							</Col>
						</Row>
					</Image.PreviewGroup>
				</Panel>
			</Collapse>
			{/* <Collapse collapsible="header" defaultActiveKey={['1', '2']} expandIconPosition="end"></Collapse> */}
		</div>
	)
}

ConversationDisplay.Typing = () => {
	// return <span style={{ fontSize: 12, padding: '0px 20px' }}>Typing time</span>
}

export default ConversationDisplay
