import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import styles from './Modal.module.scss'

interface props {
	open: any
	setOpen: Function
}
const ModalPost: React.FC<props> = ({ open, setOpen }) => {
	return (
		<Modal
			title={<div className={styles.titleModal}>Create new post</div>}
			centered
			open={open}
			onCancel={() => {
				setOpen(false)
			}}
			className={styles.modal}
			footer={null}
			closable={false}
		>
			<div className={styles.modalContentPost}>
				{/* <Button type="primary">Select From Computer</Button> */}
				<img
					src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.22sRFqFGX3YYAtah66MjuAHaJQ%26pid%3DApi&f=1&ipt=f4ab8466420cf315a8ee516bc3427d734186e39b2c9dcb86e2e556e00df1cf7e&ipo=images"
					alt=""
				/>
			</div>
		</Modal>
	)
}

export default ModalPost
