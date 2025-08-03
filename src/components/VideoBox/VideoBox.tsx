import React from 'react'
import { Box } from '@mui/material'

type Props = { VideoSrc: string }

/**
 * A simple component that renders a video in a Box.
 * The width of the video is set to 100% and the height is set to auto.
 * The video is given a block display.
 * The controls attribute is set to true to allow the user to control the video.
 * @param {{ VideoSrc: string }} Props - The props given to the component.
 * @param {string} Props.VideoSrc - The source URL of the video.
 * @returns {React.ReactElement} - The component.
 */
const VideoBox = ({ VideoSrc }: Props) => {
	return (
		<Box
			sx={{
				maxWidth: '100%',
				display: 'block',
			}}
		>
			<video
				src={VideoSrc}
				controls
				style={{ width: '100%', height: 'auto', display: 'block' }}
			/>
		</Box>
	)
}

export default VideoBox
