import * as React from 'react'
import { Button, Modal, Image, Row, Col, Avatar } from 'antd'
import { useState } from 'react'

import styles from './Galery.module.scss'
import avt from './cat.jpg'

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
								<p className="post__caption--time">
									<span>1</span> Ngày trước
								</p>
							</div>
							<div>
								<div className="post__group-bottom">
									{/* Group of interactive icons */}
									<div className="post__group-bottom">
										<div className="icons">
											<div className="icons-left">
												<span>
													<i className="bx bx-heart"></i>
												</span>
												<span>
													<i className="bx bx-message-rounded"></i>
												</span>
												<span>
													<i className="bx bx-paper-plane"></i>
												</span>
											</div>
											<div className="icons-right">
												<span>
													<i className="bx bx-bookmark"></i>
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
