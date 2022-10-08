import { Modal } from 'antd'
import React, { useState } from 'react'
import styles from './Modal.module.scss'

interface props {
	open: any
	setOpen: Function
}

const ModalLogin: React.FC<props> = ({ open, setOpen }) => {
	return (
		<Modal
			centered
			open={open}
			onCancel={() => {
				setOpen(false)
			}}
			className={styles.modal}
			footer={null}
		>
			<div className={styles.modalContent}>Instagram</div>
		</Modal>
	)
}

export default ModalLogin
