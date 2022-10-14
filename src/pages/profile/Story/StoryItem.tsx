import React from 'react'
import styles from './Story.module.scss'

export function StoryItem(props) {
	return (
		<li className={styles.Wrap}>
			<div className={styles.ImageWrap}>
				<img className={styles.Image} src={props.imagePath} />
			</div>
			<div className={styles.Title}>{props.title}</div>
		</li>
	)
}

StoryItem.defaultProps = {
	imagePath: '/images/story-1.jpg',
	title: 'IDPWD',
}
