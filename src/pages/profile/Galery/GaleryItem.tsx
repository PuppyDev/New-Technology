import * as React from 'react'
import styles from './Galery.module.scss'
import { Button, Modal, Image } from 'antd'
import { useState } from 'react'

export function GalleryItem({ imagepath, title }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	console.log('imagePath - GalleryItem', imagepath)
	return (
		<div className={styles.Wrap}>
			<Image preview={false} className={styles.Img} alt="gallery-post" src={imagepath} onClick={showModal} />

			<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
				<p>{title}</p>
				<Image preview={false} className={styles.Img} alt="gallery-post" src={imagepath} />
			</Modal>
		</div>
	)
}
GalleryItem.defaultProps = {
	imagePath: '/images/transparent.png',
	icon: '',
}
