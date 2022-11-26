import { userApi } from '@/api/userApi'
import AccountItem from '@/components/common/AccountItem/index'
import { Wrapper as PopperWrapper } from '@/components/Popper/index'
import useDebounce from '@/hooks/useDebounce'
import { User } from '@/models/user'
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons'
import HeadlessTippy from '@tippyjs/react/headless'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styles from './Seach.module.scss'

function Search() {
	const [searchValue, setSearchValue] = useState('')
	const [searchResult, setSearchResult] = useState<User[]>([])
	const [showResult, setshowResult] = useState(true)
	const [loading, setLoading] = useState(false)

	const debounced = useDebounce(searchValue, 500)

	const inputRef = useRef(null)

	useEffect(() => {
		if (!debounced.trim()) {
			setSearchResult([])
			return
		}

		const fetchApi = async () => {
			setLoading(true)

			const response = await userApi.searchUserByUserName(debounced)

			setSearchResult(response?.data)
			setLoading(false)
		}

		fetchApi()
	}, [debounced])

	const handleClear = () => {
		setSearchValue('')
		setSearchResult([])
	}

	const handleHideResult = () => {
		setshowResult(false)
	}

	const handleChange = (e: any) => {
		const searchValue = e.target.value
		if (!searchValue.startsWith(' ')) {
			setSearchValue(e.target.value)
		}
	}

	const { t } = useTranslation()

	return (
		<HeadlessTippy
			interactive
			visible={searchValue.length > 0}
			render={(attrs) => (
				<div className={styles.search_result} tabIndex={-1} {...attrs}>
					<PopperWrapper>
						<h4 className={styles.search_title}>
							<Trans>ACCOUNT</Trans>
						</h4>
						{searchResult.map((result) => (
							<AccountItem key={result._id} data={result} onClick={handleClear} />
						))}

						{(searchResult.length < 1 || loading) && (
							<div className={styles.search_result_empty}>
								{loading ? <Spin></Spin> : <Trans>NO_RESULTS_FOUND</Trans>}
							</div>
						)}
					</PopperWrapper>
				</div>
			)}
			onClickOutside={handleHideResult}
		>
			<div className={styles.search}>
				<input
					ref={inputRef}
					value={searchValue}
					placeholder={t('SEARCH_ACCOUNT_USERNAME_OR_EMAIL')}
					spellCheck={false}
					onChange={handleChange}
					onFocus={() => setshowResult(true)}
				></input>

				{!!searchValue && !loading && (
					<button className={styles.clear} onClick={handleClear}>
						<CloseCircleFilled />
					</button>
				)}

				{loading && <LoadingOutlined className={styles.loading} />}

				<button className={styles.search_btn} onMouseDown={(e) => e.preventDefault()}>
					<svg
						width={'1.5rem'}
						height={'1.5rem'}
						viewBox="0 0 48 48"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
						></path>
					</svg>
				</button>
			</div>
		</HeadlessTippy>
	)
}

export default Search
