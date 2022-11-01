import React from 'react'

import styles from './LoadingFallBack.module.scss'

import Logo from '@/assets/images/bbsgl.png'
import { Spin } from 'antd'

const LoadingFallBack = () => {
	return (
		<div className={styles.LoadingContainer}>
			<img src={Logo} alt="Logo" />
		</div>
	)
}

export default LoadingFallBack
