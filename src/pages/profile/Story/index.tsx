import React from 'react'
import styles from './Story.module.scss'

import { data } from './data'

import { StoryItem } from './StoryItem'

export function Story() {
	const storyItems = data
	return (
		<div className={styles.Stories}>
			{storyItems.map((item, id) => (
				<StoryItem key={id} title={item.title} imagePath={item.imagePath} />
			))}
		</div>
	)
}
