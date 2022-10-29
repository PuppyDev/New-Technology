export const handleNameFile = (urlFile: string) => {
	const arrUrlFile = urlFile.split('/')
	//Get name in the end
	const arrName = arrUrlFile[arrUrlFile.length - 1].split('.')

	const finalName = arrName[0].slice(0, 10) + '.' + arrName[1]
	return finalName
}
