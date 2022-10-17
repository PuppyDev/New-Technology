import { useAppDispatch, useAppSelector } from '@/app/hook'
import { RootState } from '@/app/store'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import useOpen from '@/hooks/useOpen'
import { CloseOutlined, FileGifOutlined, FileImageOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import { Dropdown, Form, Input, Upload, Image } from 'antd'
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { Suspense, useEffect, useState } from 'react'
import TextMessage from '../../Messages/TextMessage'
import ConversationNavigate from '../ConversationNavigate'
import styles from './ConversationDisplay.module.scss'
type FormValues = {
	message: ''
}

interface props {
	inboxId: String
}

const ConversationDisplay = ({ inboxId }: props) => {
	// Display details
	const { open: isClickInfo, handleToggleOpen: toggleIsClickInfo } = useOpen()

	// Display emoji
	const { open: showIcons, handleSetOpen, handleSetClose, handleToggleOpen: toggleShowIcons } = useOpen()

	const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
		console.log('🚀 ~ file: index.tsx ~ line 11 ~ handleEmojiClick ~ emoji', emojiData)
		// setValue("message", message + )
	}

	// Display reply message
	const replyMessage = useAppSelector((state: RootState) => state.chatSlice.replyMessage)

	// config dispatch
	const dispatch = useAppDispatch()

	// Subcriber Socket msg in here

	const onFinish = (values: any) => {
		console.log('Success:', values)
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

	const onSearch = (value: string) => {
		setkeyword(value)
	}

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
				{isClickInfo && (
					<div className={styles.detail}>
						<ul className={styles.detail__action}>
							<li onClick={() => console.log('vo')}>Xoá đoạn chat</li>
							<li>Chặn</li>
							<li>Báo cáo</li>
						</ul>
					</div>
				)}

				{!isClickInfo && (
					<>
						<main className={styles.mainContent}>
							{/* <div className={styles.wrapper}> */}
							{/* Render msg in here */}
							<TextMessage>
								<TextMessage.TimeMessage msg={'12:29 SA'} />

								<TextMessage.OwnerMessage msg={'This is owner text'} />

								<TextMessage.ListFriendMessage>
									<TextMessage.FriendMessage msg={'Nghe nef con ddix oiw1'} />
									<TextMessage.FriendMessage msg={'Nghe nef con ddix oiw2'} />
									<TextMessage.FriendMessage msg={'Nghe nef con ddix oiw3'} />
									<TextMessage.FriendMessage
										msg={
											<img
												src="https://media2.giphy.com/media/l1J9RvTMj524KBkac/giphy-preview.webp?cid=9f0f6425ti2km5zo9l6umokitvydq1gu4dphbx805naezfet&rid=giphy-preview.webp&ct=g"
												alt="image"
											/>
										}
									/>
								</TextMessage.ListFriendMessage>

								<TextMessage.TimeMessage msg={'14:00 CH'} />

								<TextMessage.OwnerMessage msg={'This is owner text'} />
								<TextMessage.OwnerMessage
									msg={
										<>
											<img
												src="https://media2.giphy.com/media/l1J9RvTMj524KBkac/giphy-preview.webp?cid=9f0f6425ti2km5zo9l6umokitvydq1gu4dphbx805naezfet&rid=giphy-preview.webp&ct=g"
												alt="image"
											/>
										</>
									}
								/>
								<TextMessage.OwnerMessage
									msg={
										<Image.PreviewGroup>
											<Image
												width={100}
												src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
												fallback="data:image/png;base64,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"
											/>
											<Image
												width={100}
												src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
											/>
										</Image.PreviewGroup>
									}
								/>

								<TextMessage.ListFriendMessage>
									<TextMessage.FriendMessage
										msg={
											<Image
												width={200}
												src="https://media2.giphy.com/media/l1J9RvTMj524KBkac/giphy-preview.webp?cid=9f0f6425ti2km5zo9l6umokitvydq1gu4dphbx805naezfet&rid=giphy-preview.webp&ct=g"
												fallback="data:image/png;base64,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"
											/>
										}
									/>
								</TextMessage.ListFriendMessage>
							</TextMessage>
						</main>

						<div>
							{replyMessage.msg && (
								<div className={styles.reply__action}>
									<div>
										<p className={styles.reply__action_header}>
											Trả lời {replyMessage.replyFor ? replyMessage.replyFor : 'chính mình'}
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
								</div>
							)}
							<Form onFinish={onFinish} className={styles.sendInput}>
								<Form.Item name="message">
									<Input
										autoComplete="off"
										className={styles.input}
										prefix={
											<div className={`${styles.relative} ${showIcons && styles.showEmoji}`}>
												<div className={styles.emojiPicker}>
													<EmojiPicker
														onEmojiClick={handleEmojiClick}
														emojiStyle={EmojiStyle.NATIVE}
														skinTonesDisabled={true}
														previewConfig={{}}
														lazyLoadEmojis={true}
													/>
												</div>
												<SmileOutlined className={styles.icon} onClick={toggleShowIcons} />
											</div>
										}
										placeholder="Message..."
										onChange={(e) => console.log(e)}
										suffix={
											<>
												<Upload>
													<PaperClipOutlined className={styles.iconAction} />
												</Upload>
												<div>
													<Dropdown
														overlay={
															<div className={styles.wrapGif}>
																<div className={styles.middle}>
																	<div className={styles.search}>
																		<Input.Search onSearch={onSearch} />
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
														placement="topRight"
														destroyPopupOnHide
													>
														<FileGifOutlined className={styles.iconAction} />
													</Dropdown>
												</div>
												<Upload>
													<FileImageOutlined
														className={styles.iconAction}
														style={{ paddingRight: '20px' }}
													/>
												</Upload>
												{/* <button type="submit" className={styles.actions}>
												Send
											</button> */}
											</>
										}
										allowClear
									/>
								</Form.Item>
							</Form>
						</div>
					</>
				)}
			</Suspense>
		</div>
	)
}

ConversationDisplay.Sekeleton = () => {
	return
}

export default ConversationDisplay
