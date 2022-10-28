import { useAppDispatch, useAppSelector } from '@/app/hook'
import Logo from '@/assets/images/bbsgl.png'
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
import { Avatar, Dropdown, Menu, Modal, Space } from 'antd'
import { logout } from 'pages/auth/authSlice'
import React, { useState } from 'react'
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
	const menuNotification = (
		<div>
			<Menu
				className={styles.menuNotification}
				items={[
					{
						key: '1',
						label: (
							<FriendRequest
								avatar={
									'https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-1/312603886_1521295268335191_853326481758830544_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lgwIhizXZjEAX8bRm6B&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT_L5QZnnba1SzoSNZKOIN2gJSTuKZsLg5HHGZvbEX_x_Q&oe=635CE66C'
								}
								username={'Trần Sỹ'}
								time={'1 ngày trước'}
							/>
						),
					},
					{
						key: '2',
						label: (
							<FriendRequest
								avatar={
									'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-1/150824650_907704233133970_7361803211201239538_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OYV4avReFY0AX-Rc0Ag&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT9_52vObnUMKV9H5r7HuG6_ST_axAOuXwbADw6_fvtQZg&oe=637D6B30'
								}
								username={'Bảo Đoàn'}
								time={'3 ngày trước'}
							/>
						),
					},
					{
						key: '3',
						label: (
							<FriendRequest
								avatar={
									'https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-1/311743184_1819918978349276_514877341982511448_n.jpg?stp=dst-jpg_s200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Lv7vfAK6XicAX8l4erc&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT_3GyvPkHWl7XF7CweHNgF39-z0fHjzQIEQKFKHjn7NHw&oe=635C431E'
								}
								username={'Bảo Huỳnh'}
								time={'1 tuần trước'}
							/>
						),
					},
					{
						key: '4',
						label: (
							<FriendRequest
								avatar={
									'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-1/305220249_3390900867859963_8999404357755860763_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=b_E8Ag7h3fcAX_n84ai&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-ZPzRsE3MzsgL6Dkmo39MdkLjpg4C9sJIzT5IuRgnF4w&oe=635C675B'
								}
								username={'Giang Võ'}
								time={'1 tuần trước'}
							/>
						),
					},
				]}
			/>
		</div>
	)

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<Link to={`/${user?.username}`}>
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
				<Dropdown
					overlay={menuNotification}
					placement="bottomRight"
					arrow={{ pointAtCenter: true }}
					trigger={['click']}
				>
					<Space>
						<HeartOutlined />
					</Space>
				</Dropdown>
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
