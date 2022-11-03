import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// import { Container } from './styles';

const PageNotFound: React.FC = () => {
	const { t } = useTranslation()

	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/')
	}

	return (
		<Result
			status="404"
			title="404"
			subTitle={t('ERROR.MESSAGE')}
			extra={
				<Button onClick={handleClick} type="primary">
					{t('ERROR.BACKHOME')}
				</Button>
			}
		/>
	)
}

export default PageNotFound
