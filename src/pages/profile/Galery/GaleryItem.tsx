import * as React from 'react'
import styles from './Galery.module.scss'

export function GalleryItem({ imagepath }) {
	console.log('imagePath - GalleryItem', imagepath)
	return (
		<div className={styles.Wrap}>
			<img className={styles.Img} alt="gallery-post" src={imagepath} />
		</div>
	)
}
GalleryItem.defaultProps = {
	imagePath: '/images/transparent.png',
	icon: '',
}
