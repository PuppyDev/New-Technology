export interface Post {
	username: string
	_id: string
	image: string[]
	numberOfLikes: number
	likes: []
	reports: []
	comments: []
	user: string
	caption: string
	createdAt: string
	updatedAt: string
}
