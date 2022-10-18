import React, { useEffect, useRef, useState } from 'react'
import styles from './CallVideo.module.scss'
import { Peer } from 'peerjs'
import VideoPlayer from '../components/VideoPlayer'

const CallVideo = () => {
	const [peerId, setPeerId] = useState<any>()

	const [stream, setStream] = useState<MediaStream>()
	const [peerStream, setPeerStream] = useState<MediaStream>()
	const remoteVideoRef = useRef()
	useEffect(() => {
		// assign id here maybe backend randomID peer and return for frontend
		// const peer = new Peer('id backend return here')
		const peer = new Peer()

		peer.on('open', (id) => {
			setPeerId(id)
		})

		try {
			// Get access Camera and Microphone in devices
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					setStream(stream)
				})
				.catch((err) => console.log(err))
		} catch (err) {
			console.log('🚀 ~ file: index.tsx ~ line 30 ~ useEffect ~ err', err)
		}
	}, [])

	return (
		<div className={styles.callVideoContainer}>
			{stream && (
				<>
					<VideoPlayer.ControlVideo>
						<VideoPlayer stream={stream} />
					</VideoPlayer.ControlVideo>
					{/* <VideoPlayer stream={peerStream} /> */}
				</>
			)}
		</div>
	)
}

export default CallVideo
