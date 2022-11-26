import React from 'react'

const useOpen = (initOpen?: boolean) => {
	const [open, setOpen] = React.useState<boolean>(initOpen || false)

	const handleToggleOpen = () => {
		setOpen((pre) => !pre)
	}

	const handleSetOpen = () => {
		setOpen(true)
	}

	const handleSetClose = () => {
		setOpen(false)
	}

	return {
		open,
		setOpen,
		handleToggleOpen,
		handleSetOpen,
		handleSetClose,
	}
}

export default useOpen
