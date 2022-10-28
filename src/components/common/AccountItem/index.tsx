import { User } from '@/models/user'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Image from '../Image'
import styles from './AccountItem.module.scss'
const cx = classNames.bind(styles)

function AccountItem({ data, onClick }: { data: User; onClick: any }) {
	return (
		<Link to={`/${data._id}`} className={cx('wrapper')} onClick={onClick}>
			<Image
				className={cx('avatar')}
				src={data?.image ? data.image : 'https://joeschmoe.io/api/v1/random'}
				alt={data.name}
			/>
			<div className={cx('info')}>
				<h4 className={cx('name')}>
					{' '}
					<span>{data.name}</span>
				</h4>{' '}
				<span className={cx('username')}>{data.username}</span>{' '}
			</div>{' '}
		</Link>
	)
}

export default AccountItem
