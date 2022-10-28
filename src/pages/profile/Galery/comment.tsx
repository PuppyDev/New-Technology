import { Tooltip } from 'antd'
import React from 'react'

export const comment = [
	{
		actions: [<span key="comment-list-reply-to-0">Reply to</span>],
		author: 'Han Solo',
		avatar: 'https://joeschmoe.io/api/v1/random',
		content: (
			<p>
				We supply a series of design principles, practical patterns and high quality design resources (Sketch
				and Axure), to help people create their product prototypes beautifully and efficiently.
			</p>
		),
		datetime: (
			<Tooltip title="2016-11-22 11:22:33">
				<span>8 hours ago</span>
			</Tooltip>
		),
	},
	{
		actions: [<span key="comment-list-reply-to-0">Reply to</span>],
		author: 'Han Solo',
		avatar: 'https://joeschmoe.io/api/v1/random',
		content: (
			<p>
				We supply a series of design principles, practical patterns and high quality design resources (Sketch
				and Axure), to help people create their product prototypes beautifully and efficiently.
			</p>
		),
		datetime: (
			<Tooltip title="2016-11-22 10:22:33">
				<span>9 hours ago</span>
			</Tooltip>
		),
	},
]
