import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Image from '../Image'
import styles from './AccountItem.module.scss'
const cx = classNames.bind(styles)

function AccountItem({ data }: { data: any }) {
	return (
		<Link to={`/@${data.nickname}`} className={cx('wrapper')}>
			<Image className={cx('avatar')} src={data.avatar} alt={data.full_name} data={data} />
			<div className={cx('info')}>
				<h4 className={cx('name')}>
					{' '}
					<span>{data.full_name}</span>
				</h4>{' '}
				<span className={cx('username')}>{data.nickname}</span>{' '}
			</div>{' '}
		</Link>
	)
}

export default AccountItem