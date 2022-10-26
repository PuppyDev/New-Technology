import { AntDesignOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout } from 'antd'
import React from 'react'
import styles from './Profile.module.scss'
import avt from './cat.jpg'
import { KeyNumbers } from './KeyNumbers/Index'
import { Story } from './Story'
import Tab from './Tab'
import { Gallery } from './Galery'
const { Header, Footer, Sider, Content } = Layout
import { useTranslation } from 'react-i18next'
const Profile = () => {
	const { t, i18n } = useTranslation()
	const stateUser = 'owner'

	return (
		<main className={styles.Main}>
			<header className={styles.Header}>
				<div className={styles.HeaderWrap}>
					<div className={styles.ProfilePic}>
						<img className={styles.ProfileImg} src={avt} alt="image"></img>
					</div>
					<div>
						<div className={styles.ProfileRow}>
							<div className={styles.ProfileTitle}>
								<h2 className={styles.ProfileH2}>BaoHuynh</h2>

								<div className={styles.ProfileButtonWrap}>
									{stateUser === 'owner' ? (
										<Button>{t('EDIT_PROFILE')}</Button>
									) : (
										<Button type="primary">Theo dõi</Button>
									)}
								</div>
							</div>
						</div>

						<div className={styles.ProfileRow}>
							<KeyNumbers />
						</div>
						<div className={styles.ProfileDescriptions}>
							<h1 className={styles.ProfileDescriptionH1}>tehee</h1>
							<span className={styles.ProfileDescriptionSpan}>
								Meo meo meo meo Meo
								<br />
								Meo meo meo meo Meo
							</span>
						</div>
					</div>
				</div>
			</header>
			<Story />
			<Tab />
			<Gallery />
		</main>
	)
}

export default Profile
