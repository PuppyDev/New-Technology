export interface PaginationParams {
	page: number
	size: number
	totalItem: number
	totalPage: number
}

export interface ListResponse<T> extends PaginationParams {
	items: T[]
}

export interface ResponseObject<T> {
	data: T
	errorCode: number
	message: string
}
