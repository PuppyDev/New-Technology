import { LayoutProps } from '@/models/common'
import * as React from 'react'
import Header from '@/common/Header'

export function MainLayout({ children }: LayoutProps) {
	return (
		<React.Fragment>
			<Header />
			<div style={{ paddingTop: '80px' }}>{children}</div>
			{/* <Footer /> */}
		</React.Fragment>
	)
}
