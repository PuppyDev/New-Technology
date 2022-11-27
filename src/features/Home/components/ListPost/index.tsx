import { postApi } from '@/api/postApi'
import { Post } from '@/models/post'
import React, { useEffect, useState } from 'react'
import PostItem from '../Post'
import styles from './ListPost.module.scss'

const ListPost = () => {
	useEffect(() => {
		fetchAllPost()
	}, [])

	const [listPostNewFeed, setlistPostNewFeed] = useState<Post[]>()

	const fetchAllPost = async () => {
		try {
			const response = await postApi.getAllPost()
			setlistPostNewFeed(response.data?.posts || [])
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 18 ~ fetchAllPost ~ err', err)
		}
	}

	return (
		<div className={styles.ListPost}>
			{listPostNewFeed?.map((postData) => (
				<PostItem key={postData._id} postData={postData} />
			))}
		</div>
	)
}

export default ListPost
