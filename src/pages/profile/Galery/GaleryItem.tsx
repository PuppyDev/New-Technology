import * as React from 'react'
import { Button, Modal, Image, Row, Col, Avatar, Comment, List, Tooltip } from 'antd'
import { useState } from 'react'
import { comment } from './comment'
import styles from './Galery.module.scss'
import avt from './cat.jpg'
import {
	BarsOutlined,
	CommentOutlined,
	FontSizeOutlined,
	HeartOutlined,
	SendOutlined,
	ShareAltOutlined,
} from '@ant-design/icons'

export function GalleryItem({ imagepath, title }: { imagepath: string; title: string }) {
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

	return (
		<div className={styles.Wrap}>
			<Image preview={false} className={styles.Img} alt="gallery-post" src={imagepath} onClick={showModal} />

			<Modal
				bodyStyle={{ padding: '0px' }}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				width={1300}
			>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col className="gutter-row" span={15}>
						<div className={styles.Postimg}>
							<Image preview={false} className={styles.Img} alt="gallery-post" src={imagepath} />
						</div>
					</Col>
					<Col className="gutter-row" span={9}>
						<div className={styles.Post}>
							<div>
								{' '}
								<div className={styles.PostHeader}>
									<Avatar src={<Image src={avt} style={{ width: 32 }} />} />
									<h6 className={styles.PostIDHeader}>BaoHuynh</h6>
								</div>
								<div className={styles.PostBody}>
									<Avatar src={<Image src={avt} style={{ width: 32 }} />} />
									<h6 className={styles.PostIDBody}>BaoHuynh</h6>
									<p> "Don't feel better than anybody"</p>
								</div>
								<p className={styles.postCaptionTime}>
									<span>1</span> Ngày trước
								</p>
							</div>
							<div>
								<div className={styles.postGroupBottom}>
									{/* Group of interactive icons */}
									<div className={styles.postGroupBottom}>
										<div className={styles.reactPost}>
											<div className={styles.iconsLeft}>
												<span>
													<HeartOutlined />
												</span>
												<span>
													<CommentOutlined />
												</span>
												<span>
													<SendOutlined />
												</span>
											</div>
											<div className={styles.iconsRight}>
												<span>
													<BarsOutlined />
												</span>
											</div>
										</div>
										<div className="post__interactive-info">
											<a href="/#">
												<span>321</span> lượt thích
											</a>
										</div>
									</div>
									<div className="post__caption">{/* Time */}</div>
									{/* input field for comment */}
									<div className="post__comment">
										<form>
											<span>
												<i className="bx bx-smile"></i>
											</span>
											<input type="text" placeholder="Thêm bình luận..." />
											<button className="btn btn-post-comment">Đăng</button>
										</form>
									</div>
									<List
										className="comment-list"
										header={`${comment.length} replies`}
										itemLayout="horizontal"
										dataSource={comment}
										renderItem={(item) => (
											<li>
												<Comment
													actions={item.actions}
													author={item.author}
													avatar={item.avatar}
													content={item.content}
													datetime={item.datetime}
												/>
											</li>
										)}
									/>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Modal>
		</div>
	)
}
GalleryItem.defaultProps = {
	imagePath: '/images/transparent.png',
	icon: '',
}
