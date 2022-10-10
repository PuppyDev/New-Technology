import { Avatar, Skeleton } from 'antd'
import SkeletonAvatar from 'antd/lib/skeleton/Avatar'
import styles from './ListConversation.module.scss'
import ListConversationItem from './ListConversationItem'

const ListConversationValues = [
	{
		id: 1,
		name: 'Cún Nè',
		image: 'https://joeschmoe.io/api/v1/random',
		lastTimeActive: '2days',
		isActive: false,
		lastMessage: 'Hello',
		createAt: 1665392787939,
	},
	{
		id: 2,
		name: 'Giang Nè',
		image: 'https://joeschmoe.io/api/v1/random',
		lastTimeActive: '2days',
		isActive: false,
		lastMessage: 'Hello',
		createAt: 1665392822075,
	},
]

const ListConversation = () => {
	ListConversationValues.sort((item1, item2) => {
		return item2.createAt - item1.createAt
	})

	return (
		<div className={styles.ListConversation}>
			<div className={styles.topContent}>
				<p className={styles.headerItem}>Yone Doan</p>
			</div>
			<ul className={styles.bottomContent}>
				{ListConversationValues.map((item) => (
					<ListConversationItem key={item.id} conversation={item} />
				))}

				{/* {Array.from({ length: 2 }).map((_, index) => (
					<div key={index} className={styles.skeleton}>
						<Skeleton.Avatar active size={55} />
						<div className={styles.listItem}>
							<Skeleton.Input active size="small" />
							<Skeleton.Input active block size="small" />
						</div>
					</div>
				))} */}
			</ul>
		</div>
	)
}

export default ListConversation
