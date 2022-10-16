import React from 'react'
import styles from './KeyNumber.module.scss'
import { KeyNumber } from './keyNumber'

export function KeyNumbers() {
	return (
		<ul className={styles.ProfileDetailUl}>
			<KeyNumber label="posts" number={722} />
			<KeyNumber label="followers" number="25.1m" />
			<KeyNumber label="following" number={6} />
		</ul>
	)
}
