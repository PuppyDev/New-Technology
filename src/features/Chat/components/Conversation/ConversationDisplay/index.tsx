import { useAppDispatch, useAppSelector } from '@/app/hook'
import { RootState } from '@/app/store'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import useOpen from '@/hooks/useOpen'
import { ReplyMessage } from '@/models/conversation'
import { CloseOutlined, FileGifOutlined, FileImageOutlined, PaperClipOutlined } from '@ant-design/icons'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import { Dropdown, Form, Input, Upload } from 'antd'
import { EmojiClickData } from 'emoji-picker-react'
import { Suspense, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import InputEmoji from 'react-input-emoji'
import TextMessage from '../../Messages/TextMessage'
import ConversationNavigate from '../ConversationNavigate'
import styles from './ConversationDisplay.module.scss'
import './ConversationDisplay.scss'
type FormValues = {
	message: ''
}

interface props {
	inboxId: String
}

const ConversationDisplay = ({ inboxId }: props) => {
	const { t } = useTranslation()
	// Display details
	const { open: isClickInfo, handleToggleOpen: toggleIsClickInfo } = useOpen()

	// Display emoji
	const { open: showIcons, handleToggleOpen: toggleShowIcons } = useOpen()

	const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
		console.log('🚀 ~ file: index.tsx ~ line 11 ~ handleEmojiClick ~ emoji', emojiData)
		// setValue("message", message + )
	}

	const [message, setMessage] = useState<string>('')

	// Display reply message
	const replyMessage = useAppSelector((state: RootState) => state.chatSlice.replyMessage)

	// Subcriber Socket msg in here

	const onFinish = (values?: string) => {
		const newValues: string = message

		console.log('Success:', newValues)
		setMessage('')
	}

	useEffect(() => {
		const inputEle: HTMLInputElement | null = document.querySelector('input#message.ant-input')
		inputEle?.focus()
	}, [showIcons])

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
		const url_gif = gif.images.preview_gif.url || gif.images.preview_webp.url
		console.log('🚀 ~ file: index.tsx ~ line 69 ~ sendGifHandler ~ url_gif', url_gif)

		// const newMessage = {
		//     sender: idLogin,
		//     type: 'gif',
		//     text: e.currentTarget.childNodes[0].childNodes[0].childNodes[1]
		//         .attributes['src'].value,
		//     RoomId: props.onSendRoomToBoxChat?._id,
		// }
		// const fetchAddMessage = async () => {
		//     try {
		//         const res = await messageAPI.AddMessage({
		//             message: newMessage,
		//         })
		//         console.log(res)
		//         setMessages([...messages, res.data])
		//         //console.log(res.data);
		//         //setEnteredChat("");
		//         setIsOpenGif(false)
		//     } catch (error) {
		//         console.log(error)
		//     }
		// }
		// fetchAddMessage()
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
						<TextMessage.TimeMessage msg={'12:29 SA'} />
					</TextMessage>
				</main>

				<ConversationDisplay.ReplyDialog replyMessage={replyMessage} />

				<Form onFinish={onFinish} className={styles.sendInput}>
					<div className={styles.wrapInputItem}>
						{message.trim().length < 1 && (
							<>
								<label htmlFor="file">
									<FileImageOutlined className={styles.iconAction} />
								</label>
								<input type="file" id="file" name="file" hidden />

								<Upload>
									<PaperClipOutlined className={styles.iconAction} />
								</Upload>

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
							value={message}
							name="message"
							onChange={setMessage}
							cleanOnEnter
							onEnter={onFinish}
							placeholder={`${t('CONVERSATION.MESSAGE')}`}
							theme="light"
							className={styles.inputEmoji}
						/>
						{message.trim().length >= 1 && (
							<button type="submit" className={styles.actions}>
								Send
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

ConversationDisplay.Sekeleton = () => {
	return
}

export default ConversationDisplay
