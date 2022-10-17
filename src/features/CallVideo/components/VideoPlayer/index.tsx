import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons'
import React, { useRef, useEffect } from 'react'

import styles from './VideoPlayer.module.scss'

const VideoPlayer = ({ stream }: { stream: MediaStream }) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream
			// videoRef.current.pause()
			// videoRef.current.src = ''
			// videoRef.current.srcObject.getTracks()[0].stop()
		}
	}, [stream])

	return <video ref={videoRef} autoPlay muted={true} className={styles.video} />
}

VideoPlayer.ControlVideo = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.video__action}>
			<div className={styles.video__action_detail}>
				<span className={styles.icons}>
					<AudioOutlined />
				</span>
				<span className={styles.icons}>
					<AudioMutedOutlined />
				</span>
			</div>
			{children}
		</div>
	)
}

export default VideoPlayer
