import { createContext, useEffect, useReducer, useState } from 'react'
import Peer from 'peerjs'

import socketIOClient from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { peersReducer } from './peersReducer'
import { addPeerAction, removePeerAction } from './peersActions'
import { useAppSelector } from '@/app/hook'
// const WS = 'http://localhost:8080'

export const RoomContext = createContext<null | any>(null)

// const ws = socketIOClient(WS)

export const RoomProvider = ({ children }: { children?: React.ReactNode }) => {
	const navigate = useNavigate()

	const [me, setMe] = useState<Peer>()
	const [peers, dispatch] = useReducer(peersReducer, {})
	const [stream, setStream] = useState<MediaStream>()

	// const enterRoom = ({ roomId }: { roomId: 'string' }) => {
	// 	navigate(`/room/${roomId}`)
	// }

	// const handleUserList = ({ participants }: { participants: string[] }) => {
	// 	participants.map((peerId) => {
	// 		const call = stream && me?.call(peerId, stream)
	// 		console.log('call', call)
	// 		call?.on('stream', (userVideoStream: MediaStream) => {
	// 			console.log({ addPeerAction })
	// 			dispatch(addPeerAction(peerId, userVideoStream))
	// 		})
	// 	})
	// }

	// const removePeer = (peerId: string) => {
	// 	dispatch(removePeerAction(peerId))
	// }

	// const user = useAppSelector((state) => state.authSlice.user)

	// useEffect(() => {
	// 	const meId = user?._id
	// 	if (!meId) return

	// 	const peer = new Peer(meId)
	// 	setMe(peer)
	// 	try {
	// 		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
	// 			setStream(stream)
	// 		})
	// 	} catch (err) {
	// 		console.error({ err })
	// 	}
	// 	ws.on('room-created', enterRoom)
	// 	ws.on('get-users', handleUserList)
	// 	ws.on('user-disconnected', removePeer)
	// }, [user?._id])

	// useEffect(() => {
	// 	if (!stream) return
	// 	if (!me) return

	// 	ws.on('user-joined', ({ peerId }: { roomId: string; peerId: string }) => {
	// 		const call = stream && me.call(peerId, stream)
	// 		call.on('stream', (userVideoStream: MediaStream) => {
	// 			dispatch(addPeerAction(peerId, userVideoStream))
	// 		})
	// 	})

	// 	me.on('call', (call) => {
	// 		call.answer(stream)
	// 		call.on('stream', (userVideoStream) => {
	// 			dispatch(addPeerAction(call.peer, userVideoStream))
	// 		})
	// 	})
	// }, [stream, me])

	return <RoomContext.Provider value={{ me, peers, stream }}>{children}</RoomContext.Provider>
}
