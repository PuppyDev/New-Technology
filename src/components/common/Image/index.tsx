import { useState, forwardRef } from 'react'
import classNames from 'classnames'

import styles from './Image.module.scss'

const Image = ({ src, alt, className, ref, ...props }: { src: string; alt: string; className: any; ref?: any }) => {
	const [fallback, setFallback] = useState('')

	return (
		<img className={classNames(styles.wrapper, className)} ref={ref} src={fallback || src} alt={alt} {...props} />
	)
}

export default Image
