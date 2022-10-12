import { LayoutProps } from '@/models/common'
import * as React from 'react'
import Header from '@/common/Header'
import Footer from '../common/Footer'

export function MainLayout({ children }: LayoutProps) {
	return (
		<React.Fragment>
			<Header />
			<main style={{ paddingTop: '80px' }}>{children}</main>
			{/* <Footer /> */}
		</React.Fragment>
	)
}
