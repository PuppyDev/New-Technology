import React, { useState } from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames/bind'

import styles from './FollowButton.module.scss'

export function FollowButton() {
	const cx = classNames.bind(styles)
	const { t, i18n } = useTranslation()
	const [userState, setUserState] = useState(1)
	const renderSwitch = () => {
		switch (userState) {
			case 1:
				return (
					<>
						{' '}
						<Button>Messenger</Button> <Button>Follow</Button>
					</>
				)
			case 2:
				return (
					<>
						{' '}
						<Button>Messenger</Button> <Button>Following</Button>
					</>
				)

			default:
				return <Button>{t('EDIT_PROFILE')}</Button>
		}
	}

	return <>{renderSwitch()}</>
}
