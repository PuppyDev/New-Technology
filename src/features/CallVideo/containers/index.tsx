import { useAppSelector } from '@/app/hook'
import { SocketContext } from 'context/SocketContext'
import Peer from 'peerjs'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './CallVideo.module.scss'

const CallVideo = () => {
	const socket = useContext(SocketContext)
	const { idVideoCall: roomId } = useParams()
	const [peerId, setPeerId] = useState('')
	const [remotePeerIdValue, setRemotePeerIdValue] = useState('')
	const remoteVideoRef = useRef<any>(null)
	const currentUserVideoRef = useRef<any>(null)
	const peerInstance = useRef<any>(null)

	const user = useAppSelector((state) => state.authSlice.user)
	const conversationSeleted = useAppSelector((state) => state.chatSlice.conversationSelected)
	if (!user || !conversationSeleted || !socket) return

	useEffect(() => {
		const peer = new Peer(user?._id)

		peer.on('open', (id) => {
			setPeerId(id)
		})

		peer.on('call', (call) => {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((mediaStream) => {
					currentUserVideoRef.current.srcObject = mediaStream
					currentUserVideoRef.current.play()
					call.answer(mediaStream)
					call.on('stream', function (remoteStream) {
						remoteVideoRef.current.srcObject = remoteStream
						remoteVideoRef.current.play()
					})
				})
				.catch((err) => console.log(err))
		})

		peerInstance.current = peer
	}, [])

	const call = (remotePeerId: string) => {
		console.log('🚀 ~ file: index.tsx ~ line 47 ~ call ~ remotePeerId', remotePeerId)
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((mediaStream) => {
				currentUserVideoRef.current.srcObject = mediaStream
				currentUserVideoRef.current.play()

				const call = peerInstance.current.call(remotePeerId, mediaStream)

				call.on('stream', (remoteStream: any) => {
					remoteVideoRef.current.srcObject = remoteStream
					remoteVideoRef.current.play()
				})

				console.log('Call....')

				socket.emit('chat:call_user', {
					username: user?.name,
					userId: conversationSeleted?.users[0]._id,
					roomId,
					signal: mediaStream,
				})
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className={styles.callVideoContainer}>
			{remoteVideoRef && <button onClick={() => call(conversationSeleted.users[0]._id)}>Call</button>}
			<div>
				<video ref={currentUserVideoRef} muted={true} />
				{/* <VideoPlayer stream={currentUserVideoRef} /> */}
			</div>
			<div>
				<video ref={remoteVideoRef} />
			</div>
		</div>
	)
}

export default CallVideo

// const socket = useContext(SocketContext)

// const { idVideoCall: roomId } = useParams()

// const user = useAppSelector((state) => state.authSlice.user)
// const conversationSeleted = useAppSelector((state) => state.chatSlice.conversationSelected)
// const isRecive = useAppSelector((state) => state.callVideoSlice.isRecive)

// const [stream, setStream] = useState<MediaStream>()
// const [peerStream, setPeerStream] = useState<MediaStream>()
// const [me, setMe] = useState()
// const userVideo = useRef<any>(null)
// const myVideo = useRef<any>(null)
// const connectionRef = useRef<any>(null)
// const [callAccepted, setCallAccepted] = useState(false)

// // const [peer, setPeer] = useState<Peer>()
// const peerInstance = useRef<any>(null)

// useEffect(() => {
// 	// assign id here maybe backend randomID peer and return for frontend
// 	if (!user?._id || !socket || !conversationSeleted?.users[0]._id) return

// 	const newpeer = new Peer(user._id)
// 	newpeer.on('open', (id) => {
// 		console.log('🚀 ~ file: index.tsx ~ line 35 ~ newpeer.on ~ id', id)
// 	})
// 	console.log('🚀 ~ file: index.tsx ~ line 37 ~ newpeer.on ~ newpeer', newpeer)

// 	try {
// 		// Get access Camera and Microphone in devices
// 		navigator.mediaDevices
// 			.getUserMedia({ video: true, audio: true })
// 			.then((stream) => {
// 				setStream(stream)
// 				myVideo.current = stream
// 			})
// 			.catch((err) => console.log(err))
// 	} catch (err) {
// 		console.log('🚀 ~ file: index.tsx ~ line 30 ~ useEffect ~ err', err)
// 	}

// 	newpeer.on('call', (call) => {
// 		call.answer(stream)
// 		call.on('stream', (streamPeer) => {
// 			console.log('🚀 ~ file: index.tsx ~ line 57 ~ call.on ~ streamPeer', streamPeer)
// 			setPeerStream(streamPeer)
// 		})
// 	})

// 	// setPeer(newpeer)
// 	peerInstance.current = newpeer

// 	return () => {
// 		// peer?.destroy()
// 	}
// }, [])

// const callUser = () => {
// 	if (!user?._id || !socket || !stream || !conversationSeleted || !peerInstance) return

// 	const call = peerInstance.current.call(conversationSeleted?.users[0]._id, stream)
// 	console.log('🚀 ~ file: index.tsx ~ line 74 ~ callUser ~ call', call)

// 	call.on('stream', function (streamPeer: any) {
// 		setPeerStream(streamPeer)
// 	})

// 	socket.emit('chat:call_user', {
// 		username: user?.name,
// 		userId: conversationSeleted?.users[0]._id,
// 		roomId,
// 		signal: stream,
// 	})
// }

// return (
// 	<div className={styles.callVideoContainer}>
// 		{stream && (
// 			<>
// 				<VideoPlayer.ControlVideo>
// 					<VideoPlayer stream={stream} />
// 				</VideoPlayer.ControlVideo>
// 				{!peerStream && <Button onClick={callUser}>Starting call</Button>}
// 				{peerStream && <VideoPlayer stream={peerStream} />}
// 			</>
// 		)}
// 	</div>
// )
