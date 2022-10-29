import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React from 'react'

const { Header, Content, Sider } = Layout
const key = ['Users', 'Posts', 'Employees']
const AdminController: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
	return {
		key: `${key[index]}`,
		icon: React.createElement(icon),
		label: `${key}`,
	}
})

const Admin: React.FC = () => (
	<Layout>
		<Header className="header">
			<div className="logo" />
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
					Content
				</Content>
			</Layout>
		</Layout>
	</Layout>
)

export default Admin
