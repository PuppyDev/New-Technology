import React from 'react'
import styles from './KeyNumber.module.scss'

export function KeyNumber(props: {
	number:
		| string
		| number
		| boolean
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ReactFragment
		| React.ReactPortal
		| null
		| undefined
	label:
		| string
		| number
		| boolean
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ReactFragment
		| React.ReactPortal
		| null
		| undefined
}) {
	return (
		<li className={styles.ProfileDetailLi}>
			<span className={styles.ProfileDetailSpan}>{props.number}</span> {props.label}
		</li>
	)
}

KeyNumber.defaultProps = {
	number: '722',
	label: 'posts',
}
