import { useAppDispatch } from '@/app/hook'
import { setReplyMessage } from '@/Chat/slices/ChatSlice'
import { EllipsisOutlined, EnterOutlined, SmileOutlined } from '@ant-design/icons'

import styles from './ActionMessage.module.scss'

const ActionMessage = ({ reverse = false, msg }: { reverse?: boolean; msg: String | React.ReactNode }) => {
	const dispatch = useAppDispatch()
	const msgSend = typeof msg === 'string' ? msg : 'file đính kèm'

	return (
		<ul className={`${styles.action__message} ${reverse && styles.action__reverse}`}>
			<li>
				<EllipsisOutlined />
			</li>
			<li>
				<EnterOutlined
					rotate={180}
					onClick={() =>
						dispatch(
							setReplyMessage({
								replyMessage: {
									msg: msgSend,
									replyFor: null,
								},
							})
						)
					}
				/>
			</li>
			<li>
				<SmileOutlined />
			</li>
		</ul>
	)
}

export default ActionMessage
