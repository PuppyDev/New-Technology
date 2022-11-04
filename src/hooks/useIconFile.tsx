import { handleExtName } from '@/utils/file'
import {
	FileExcelOutlined,
	FilePdfOutlined,
	FileTextOutlined,
	FileWordOutlined,
	FileZipOutlined,
} from '@ant-design/icons'
import React from 'react'

const useIconFile = (urlFile: string) => {
	const extName = handleExtName(urlFile)

	if (['docx', 'doc'].includes(extName)) return <FileWordOutlined style={{ fontSize: '34px' }} />
	else if (['pdf'].includes(extName)) return <FilePdfOutlined style={{ fontSize: '34px' }} />
	else if (['text'].includes(extName)) return <FileTextOutlined style={{ fontSize: '34px' }} />
	else if (['xlsx', 'csv'].includes(extName)) return <FileExcelOutlined style={{ fontSize: '34px' }} />
	else return <FileZipOutlined style={{ fontSize: '34px' }} />
}

export default useIconFile
