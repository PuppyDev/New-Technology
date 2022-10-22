import { Modal } from 'antd'
import React, { useState } from 'react'
import Stories from 'react-insta-stories'

import styles from './Story.module.scss'
export function StoryItem(props) {
	const [open, setOpen] = useState(false)
	const showConfirmModal = () => {
		console.log(imgPath)

		setOpen(true)
	}
	const onCancel = () => {
		setOpen(false)
	}
	const imgPath = props.imagePath
	const stories: any = [
		'https://picsum.photos/1080/1920',
		{
			url: 'https://picsum.photos/1080/1920',
			duration: 5000,
			header: {
				heading: 'Mohit Karekar',
				subheading: 'Posted 30m ago',
				profileImage: 'https://picsum.photos/100/100',
			},
		},
	]
	return (
		<li className={styles.Wrap}>
			<div className={styles.ImageWrap}>
				<img className={styles.Image} src={props.imagePath} onClick={showConfirmModal} />
			</div>
			<div className={styles.Title}>{props.title}</div>
			<Modal centered={true} open={open} onCancel={onCancel} footer={false}>
				<Stories stories={stories} />
			</Modal>
		</li>
	)
}

StoryItem.defaultProps = {
	imagePath: '/images/story-1.jpg',
	title: 'IDPWD',
}
