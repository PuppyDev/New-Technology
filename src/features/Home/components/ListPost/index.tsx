import React from 'react'
import Post from '../Post'
import styles from './ListPost.module.scss'

const ListPost = () => {
	return (
		<div className={styles.ListPost}>
			<Post />
			<Post />
			<Post />
		</div>
	)
}

export default ListPost
