import { AliwangwangOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons'
import { Avatar, Button, Carousel, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Post.module.scss'

const Post = () => {
	const [comment, setComment] = useState('')

	return (
		<section className={styles.Post}>
			<section className={styles.Post_header}>
				<Avatar src="" />

				<Link to={'/'}>
					<span className={styles.Post_header__name}>yua_mikami</span>
				</Link>
			</section>

			<section className={styles.Post_content}>
				{/* <Carousel>
					<div>
						<img
							src="https://nhaxinhplaza.vn/wp-content/uploads/cac-trang-web-ngam-gai.jpg"
							alt="gau gau"
						/>
					</div>
					<div>
						<img
							src="https://nhaxinhplaza.vn/wp-content/uploads/cac-trang-web-ngam-gai.jpg"
							alt="gau gau"
						/>
					</div>
					<div>
						<img
							src="https://nhaxinhplaza.vn/wp-content/uploads/cac-trang-web-ngam-gai.jpg"
							alt="gau gau"
						/>
					</div>
				</Carousel> */}
				<div>
					<img src="https://nhaxinhplaza.vn/wp-content/uploads/cac-trang-web-ngam-gai.jpg" alt="gau gau" />
				</div>
			</section>
			<section className={styles.Post_footer}>
				<div className={styles.Post_footer__action}>
					<HeartOutlined />
					<AliwangwangOutlined />
				</div>
				<div className={styles.Post_footer__countLike}>957 lượt thích</div>

				<ul className={styles.Post_footer__listCmt}>
					<Post.Comment />
				</ul>

				<time className={styles.Post_footer__timeCreate}>1 ngày trước</time>
			</section>
			<section className={styles.Post_footer__PostCmt}>
				<Input placeholder="Thêm bình luận..." bordered={false} onChange={(e) => setComment(e.target.value)} />
				<p className={`${styles.btnPost} ${comment.trim().length < 1 && styles.disabled}`}>Đăng</p>
			</section>
		</section>
	)
}

Post.Comment = () => {
	return (
		<li className={styles.comment}>
			<span>
				<Link to={'/12312312'}> yoneDoan </Link>
			</span>
			yeah beautiful girl i love u
		</li>
	)
}

export default Post
