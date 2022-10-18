import React from 'react'
import styles from './Galery.module.scss'
import { data } from './data'
import { GalleryItem } from './GaleryItem'

export function Gallery() {
	return (
		<div className={styles.Grid}>
			{data.map((item, id) => (
				<GalleryItem key={id} imagepath={item.imagepath} />
			))}
		</div>
	)
}
