import { useAppDispatch, useAppSelector } from '@/app/hook'
import Logo from '@/assets/images/bbsgl.png'
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
import { Avatar, Badge, Dropdown, Form, Menu, Modal, Space } from 'antd'
import { logout } from 'pages/auth/authSlice'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ModalLogin from '../Modal/ModalLogin'
import ModalPost from '../Modal/ModalPost'
import Search from '../Search'
import styles from './Header.module.scss'
import ImageLogo from '../../../assets/image/bbsgl.png'
import FriendRequest from '../FriendRequest'

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
			<Menu className={styles.menuNotification}>
				<Menu.ItemGroup title={'Friends request'}>
					<Menu.Item key={1}>
						<FriendRequest
							avatar={
								'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/312726788_1729002340788975_614199594052393060_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=WXY_hfL1NpAAX-T6erh&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBWBomSY2HzNaH3YY4FsshIwiJB_hrGPXRoY5ZltfIRRA&oe=63603AE8'
							}
							username={'Trần Sỹ'}
							time={'1 tuần trước'}
						/>
					</Menu.Item>
					<Menu.Item key={2}>
						<FriendRequest
							avatar={
								'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/312726788_1729002340788975_614199594052393060_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=WXY_hfL1NpAAX-T6erh&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBWBomSY2HzNaH3YY4FsshIwiJB_hrGPXRoY5ZltfIRRA&oe=63603AE8'
							}
							username={'Trần Sỹ'}
							time={'1 tuần trước'}
						/>
					</Menu.Item>
					<Menu.Item key={3}>
						<FriendRequest
							avatar={
								'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/312726788_1729002340788975_614199594052393060_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=WXY_hfL1NpAAX-T6erh&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBWBomSY2HzNaH3YY4FsshIwiJB_hrGPXRoY5ZltfIRRA&oe=63603AE8'
							}
							username={'Trần Sỹ'}
							time={'1 tuần trước'}
						/>
					</Menu.Item>
					<Menu.Item key={4}>
						<FriendRequest
							avatar={
								'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/312726788_1729002340788975_614199594052393060_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=WXY_hfL1NpAAX-T6erh&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBWBomSY2HzNaH3YY4FsshIwiJB_hrGPXRoY5ZltfIRRA&oe=63603AE8'
							}
							username={'Trần Sỹ'}
							time={'1 tuần trước'}
						/>
					</Menu.Item>
					<Menu.Item key={5}>
						<FriendRequest
							avatar={
								'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/312726788_1729002340788975_614199594052393060_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=WXY_hfL1NpAAX-T6erh&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBWBomSY2HzNaH3YY4FsshIwiJB_hrGPXRoY5ZltfIRRA&oe=63603AE8'
							}
							username={'Trần Sỹ'}
							time={'1 tuần trước'}
						/>
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu>
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
						<Badge count={5} size={'small'} style={{}}>
							<HeartOutlined />
						</Badge>
					</Space>
				</Dropdown>
			</li>
			<li>
				<Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']} >
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
