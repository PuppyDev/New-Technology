import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import Logo from '@/assets/images/bbsgl.png'
import avatar from 'antd/lib/avatar'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { Fragment } from 'react'
import { Trans } from 'react-i18next'
import styles from './Admin.module.scss'
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import DataTable from './DataTable'

const { Header, Content, Sider } = Layout
const key = ['Users', 'Posts', 'Employees']
const AdminController: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
	return {
		key: `${key[index]}`,
		icon: React.createElement(icon),
		label: `${key[index]}`,
	}
})
const handleClickMenu = (e: { key: string }) => {
	e.key === 'SignOut'
}
const rightContent = () => {
	return (
		<Menu key="user" mode="horizontal" onClick={handleClickMenu}>
			<SubMenu
				title={
					<Fragment>
						<span style={{ color: '#999', marginRight: 4 }}>
							<Trans>Hi,</Trans>
						</span>
						<span>Admin</span>
						<Avatar style={{ marginLeft: 8 }} />
					</Fragment>
				}
			>
				<Menu.Item key="SignOut">
					<Trans>Sign out</Trans>
				</Menu.Item>
			</SubMenu>
		</Menu>
	)
}

const Admin: React.FC = () => (
	<Layout>
		<Header className={styles.header}>
			<img src={Logo} alt="logo" className={styles.headerImg} />
			<h1 className={styles.headerTitle}>Manager page </h1>
			<>{rightContent()}</>
		</Header>
		<Layout>
			<Sider width={200} className="site-layout-background">
				<Menu
					mode="inline"
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					style={{ height: '100%', borderRight: 0 }}
					items={AdminController}
				/>
			</Sider>
			<Layout style={{ padding: '0 24px 24px' }}>
				<Content
					className="site-layout-background"
					style={{
						padding: 24,
						margin: 0,
						minHeight: 280,
					}}
				>
					<DataTable />
				</Content>
			</Layout>
		</Layout>
	</Layout>
)

export default Admin
