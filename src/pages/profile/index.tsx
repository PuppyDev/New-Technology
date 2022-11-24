import { userApi } from '@/api/userApi'
import { useAppSelector } from '@/app/hook'
import { UserInfo } from '@/models/user'
import { Button, Space } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import avt from './cat.jpg'
import { Gallery } from './Galery'
import { KeyNumbers } from './KeyNumbers/Index'
import styles from './Profile.module.scss'
import { Story } from './Story'
import Tab from './Tab'

const Profile = () => {
	const { t } = useTranslation()

	const user = useAppSelector((state) => state.authSlice.user)
	const { _id } = useParams()

	const socket = useContext(SocketContext)
	const [userInfo, setUserInfo] = useState<UserInfo>()

	const [loadingUnFriend, setLoadingUnFriend] = useState(false)

	useEffect(() => {
		;(async () => {
			try {
				if (_id == user?._id) {
					const response = await userApi.getMineInfo()
					setUserInfo(response.data)
				} else {
					const response = await userApi.getInfoById('' + _id)
					setUserInfo(response.data)
				}
			} catch (err) {
				console.log('🚀 ~ file: index.tsx ~ line 32 ~ ; ~ err', err)
			}
		})()
	}, [_id])

	useEffect(() => {
		// Subcribe noti here
	}, [])

	const handleAddFriend = () => {
		if (!socket) return

		socket.emit('user:add_friend_request', {
			receivedUserId: userInfo?._id,
			receiveUsername: userInfo?.username,
		})

		setUserInfo((pre) => ({ ...(pre as UserInfo), addFriendRequest: true }))
	}

	const handleUnFriend = async () => {
		if (!_id) return
		try {
			setLoadingUnFriend(true)
			await userApi.unfriend({ friendId: _id, friendUsername: userInfo?.username || '' })
			setUserInfo((pre) => ({ ...(pre as UserInfo), isFriend: false }))
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 65 ~ handleUnFriend ~ err', err)
		}
		setLoadingUnFriend(false)
	}

	const [loadingButtonSend, setLoadingButtonSend] = useState(false)
	const handleUndoAddFriend = async () => {
		if (!userInfo) return
		setLoadingButtonSend(true)

		try {
			await userApi.undoRequestFriend({
				receivedUserId: userInfo?._id,
				receivedUsername: userInfo?.username,
			})

			setUserInfo((pre) => ({ ...(pre as UserInfo), addFriendRequest: false }))
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 73 ~ handleUndoAddFriend ~ err', err)
		}
		setLoadingButtonSend(false)
	}

	return (
		<main className={styles.Main}>
			<header className={styles.Header}>
				<div className={styles.HeaderWrap}>
					<div className={styles.ProfilePic}>
						<img className={styles.ProfileImg} src={userInfo?.image || avt} alt="image"></img>
					</div>
					<div>
						<div className={styles.ProfileRow}>
							<div className={styles.ProfileTitle}>
								<h2 className={styles.ProfileH2}>{userInfo?.name}</h2>

								<div className={styles.ProfileButtonWrap}>
									{user?._id !== _id &&
										(!userInfo?.isFriend ? (
											userInfo?.addFriendRequest ? (
												<Button
													type="primary"
													onClick={handleUndoAddFriend}
													loading={loadingButtonSend}
												>
													{t('ADD_FRIENDED')}
												</Button>
											) : (
												<Button onClick={handleAddFriend}>{t('ADD_FRIEND')}</Button>
											)
										) : (
											<>
												<Button type="primary">
													<Link to={`/direct/inbox/${userInfo._id}`}>
														{t('SEND_MESSAGE')}
													</Link>
												</Button>
												<Button
													style={{ marginLeft: 5 }}
													loading={loadingUnFriend}
													onClick={handleUnFriend}
												>
													{t('CANCEL_FRIEND')}
												</Button>
											</>
										))}

									{user?._id === _id && <Button>{t('EDIT_PROFILE')}</Button>}
								</div>
							</div>
						</div>

						{/* <div className={styles.ProfileRow}>
							<KeyNumbers />
						</div> */}
						<div className={styles.ProfileDescriptions}>
							<h2 className={styles.ProfileDescriptionH1}>@{userInfo?.username}</h2>
							<span className={styles.ProfileDescriptionSpan}>
								Meo meo meo meo Meo
								<br />
								Meo meo meo meo Meo
							</span>
						</div>
					</div>
				</div>
			</header>
			<Story />
			<Tab />
			<Gallery />
		</main>
	)
}

export default Profile
