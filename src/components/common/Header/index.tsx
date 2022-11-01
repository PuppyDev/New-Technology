import { userApi } from '@/api/userApi'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import Logo from '@/assets/images/bbsgl.png'
import { NotificationRequest } from '@/models/notification'
import {
	HeartOutlined,
	HomeOutlined,
	MessageOutlined,
	PlusSquareOutlined,
	SaveOutlined,
	SettingOutlined,
	SwapOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Menu, Modal, Space } from 'antd'
import { SocketContext } from 'context/SocketContext'
import { logout } from 'pages/auth/authSlice'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import FriendRequest from '../FriendRequest'
import ModalLogin from '../Modal/ModalLogin'
import ModalPost from '../Modal/ModalPost'
import Search from '../Search'
import styles from './Header.module.scss'

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header__container}>
				<Link to="/" className={styles.header__containerlogo}>
					<img src={Logo} alt="logo" />
				</Link>
				<div>
					<Search />
				</div>
				<nav className={styles.header__containernav}>
					<ControlNavLink />
				</nav>
			</div>
		</div>
	)
}

const ControlNavLink: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [openAddPost, setOpenAddPost] = useState(false)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const user = useAppSelector((state) => state.authSlice.user)

	const handleLogout = () => {
		const timerLogout = setTimeout(() => {
			modal.destroy()
			dispatch(logout())
		}, 3000)

		const modal = Modal.info({
			title: 'Đang đăng xuất ',
			content: 'Bạn cần phải đăng nhập lại',
			onOk() {
				dispatch(logout())
				navigate('/login')
				clearTimeout(timerLogout)
			},
			centered: true,
		})
	}

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<Link to={`/${user?._id}`}>
							<UserOutlined />
							Profile
						</Link>
					),
				},
				{
					key: '2',
					label: (
						<Link to="/">
							<SaveOutlined />
							Saved
						</Link>
					),
				},
				{
					key: '3',
					label: (
						<Link to="/accounts/edit/">
							<SettingOutlined />
							Settings
						</Link>
					),
				},
				{
					key: '4',
					label: (
						<a onClick={() => setOpen(true)}>
							<SwapOutlined />
							Switch accounts
						</a>
					),
				},
				{
					key: '5',
					danger: true,
					label: (
						<div className={styles.item} onClick={handleLogout}>
							Log out
						</div>
					),
				},
				{
					key: '6',
					label: (
						<Link to="/admin">
							<SaveOutlined />
							Admin DevShowonly!
						</Link>
					),
				},
			]}
			className={styles.menu}
		/>
	)

	return (
		<ul>
			<li>
				<NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
					<HomeOutlined />
				</NavLink>
			</li>
			<li>
				<NavLink to="/direct/inbox" className={({ isActive }) => (isActive ? styles.active : '')}>
					<MessageOutlined />
				</NavLink>
			</li>
			<li onClick={() => setOpenAddPost(true)}>
				<PlusSquareOutlined />
			</li>
			<li>
				<Header.Notification />
			</li>
			<li>
				<Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
					<Space>
						<Avatar icon={<UserOutlined />} size={26}></Avatar>
					</Space>
				</Dropdown>
				<ModalLogin open={open} setOpen={setOpen} />
				<ModalPost open={openAddPost} setOpen={setOpenAddPost} />
			</li>
		</ul>
	)
}

Header.Notification = () => {
	const [requestItems, setRequestItems] = useState<NotificationRequest[]>([])

	const socket = useContext(SocketContext)

	useEffect(() => {
		;(async () => {
			try {
				const response = await userApi.getAllNotification()
				setRequestItems(response.data)
			} catch (err) {
				console.log('🚀 ~ file: index.tsx ~ line 172 ~ err', err)
			}
		})()
	}, [])

	useEffect(() => {
		if (!socket) return

		socket.on('home:friend_connect', (dataGot) => {
			// Notifi right here
			console.log('🚀 ~ file: index.tsx ~ line 179 ~ socket.on ~ dataGot', dataGot)
		})
	}, [])

	return (
		<Dropdown
			overlay={
				<div className={styles.menuNotification}>
					{requestItems.length > 0 &&
						requestItems.map((request) => <FriendRequest notification={request} key={request._id} />)}

					{/* No data  */}
					{requestItems.length < 1 && <div className={styles.menuNotification__nothing}>Nothing in here</div>}
				</div>
			}
			placement="bottomRight"
			arrow={{ pointAtCenter: true }}
			trigger={['click']}
		>
			<Space>
				<Badge count={requestItems.length} size={'small'} style={{}}>
					<HeartOutlined />
				</Badge>
			</Space>
		</Dropdown>
	)
}

export default Header
