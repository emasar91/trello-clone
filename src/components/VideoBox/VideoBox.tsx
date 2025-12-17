import React from 'react'
import { Box } from '@mui/material'

type Props = { VideoSrc: string }

/**
 * VideoBox es un componente que renderiza un video en un Box.
 * El ancho del video se establece en 100% y la altura se establece en auto.
 * El video se da un display block.
 * El atributo controls se establece en true para permitir al usuario controlar el video.
 * @param {{ VideoSrc: string }} Props - Las props dadas al componente.
 * @param {string} Props.VideoSrc - La URL de la fuente del video.
 * @returns {React.ReactElement} - El componente VideoBox.
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
