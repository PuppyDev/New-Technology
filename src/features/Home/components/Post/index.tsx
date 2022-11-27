import { Post } from '@/models/post'
import { fromNow } from '@/utils/time'
import { AliwangwangOutlined, HeartOutlined } from '@ant-design/icons'
import { Avatar, Carousel, Input } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './Post.module.scss'

const PostItem = ({ postData }: { postData: Post }) => {
	const [comment, setComment] = useState('')
	const [countLike, setCountLike] = useState(postData.numberOfLikes)
	const { t } = useTranslation()

	return (
		<section className={styles.Post}>
			<section className={styles.Post_header}>
				<Avatar src="" />

				<Link to={'/' + postData.user}>
					<span className={styles.Post_header__name}>{postData.username}</span>
				</Link>
			</section>

			<section className={styles.Post_content}>
				<Carousel>
					{postData.image.map((img) => (
						<div key={img}>
							<img src={img} alt="gau gau" />
						</div>
					))}
				</Carousel>
			</section>
			<section className={styles.Post_footer}>
				<div className={styles.Post_footer__action} onClick={() => setCountLike((pre) => pre + 1)}>
					<HeartOutlined />
					<AliwangwangOutlined />
				</div>
				<div className={styles.Post_footer__countLike}>
					{countLike} {t('POST.LIKED')}
				</div>

				<ul className={styles.Post_footer__listCmt}>
					<PostItem.Comment postData={postData} />
				</ul>

				<time className={styles.Post_footer__timeCreate}>{fromNow(postData.createdAt)}</time>
			</section>
			<section className={styles.Post_footer__PostCmt}>
				<Input placeholder="Thêm bình luận..." bordered={false} onChange={(e) => setComment(e.target.value)} />
				<p className={`${styles.btnPost} ${comment.trim().length < 1 && styles.disabled}`}>
					{t('POST.POSTCOMMENT')}
				</p>
			</section>
		</section>
	)
}

PostItem.Comment = ({ postData }: { postData: Post }) => {
	return (
		<li className={styles.comment}>
			<span>
				<Link to={'/' + postData.user}> {postData.username} </Link>
			</span>
			{postData.caption}
		</li>
	)
}

export default PostItem
