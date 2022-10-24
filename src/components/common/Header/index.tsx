import { useAppDispatch, useAppSelector } from '@/app/hook'
import {
	HeartOutlined,
	HomeOutlined,
	MessageOutlined,
	PlusSquareOutlined,
	SaveOutlined,
	SearchOutlined,
	SettingOutlined,
	SwapOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Modal, Space } from 'antd'
import { logout } from 'pages/auth/authSlice'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ModalLogin from '../Modal/ModalLogin'
import ModalPost from '../Modal/ModalPost'
import styles from './Header.module.scss'
import ImageLogo from '../../../assets/image/bbsgl.png'

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header__container}>
				<Link to="/" className={styles.header__containerlogo}>
					<img
						src={ImageLogo}
						alt="logo"
					/>
				</Link>

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
						<a
							onClick={() => {
								setOpen(true)
							}}
						>
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
			<li
				onClick={() => {
					setOpenAddPost(true)
				}}
			>
				<PlusSquareOutlined />
			</li>
			<li>
				<NavLink to="/123" className={({ isActive }) => (isActive ? styles.active : '')}>
					<SearchOutlined />
				</NavLink>
			</li>
			<li>
				<NavLink to="/211" className={({ isActive }) => (isActive ? styles.active : '')}>
					<HeartOutlined />
				</NavLink>
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

export default Header
