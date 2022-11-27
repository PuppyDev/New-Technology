import { Result } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './VerifyInform.module.scss'

// import { Container } from './styles';

const VerifyInform: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.container}>
			<Result
				style={{ width: '100%' }}
				status="success"
				title={t('CONGRATULATIONS')}
				subTitle={t('VERIFY_SUCCESS_INFORM')}
				extra={[
					<div>
						<Link to={'/login'}>{t('GOHOME')}</Link>
					</div>,
				]}
			/>
		</div>
	)
}

export default VerifyInform
