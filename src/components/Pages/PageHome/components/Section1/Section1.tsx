import { useStoreTrello } from '@/context/useStoreTrello'
import { PlayVideoIcon } from '@/public/assets/icons/PlayVideoIcon'
import { Box, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import {
	PageHomeContainerStyle,
	PageHomeContentStyle,
	PageHomeDescriptionStyle,
	PageHomeIconContainerStyle,
	PageHomeLinkContainerStyle,
	PageHomeLinkStyle,
	PageHomeSubtitleStyle,
	PageHomeTitleStyle,
	PageHomeVideoContainerStyle,
	PageHomeVideoStyle,
} from './Section1.styles'

/**
 * Section1 es el componente de la seccion 1 de la pagina de inicio.
 * Renderiza un texto con el titulo, subtitulo y descripcion de la seccion 1.
 * Renderiza un video con el video source set to "/assets/video/updatedhero.mp4".
 * @returns {JSX.Element} Section1 componente
 */
const Section1 = () => {
	const { setOpenModal } = useStoreTrello()
	const t = useTranslations('PageHome.section1')
	return (
		<Box sx={PageHomeContainerStyle}>
			<Box sx={PageHomeContentStyle}>
				<>
					<Typography variant="h1" sx={PageHomeTitleStyle}>
						{t('title')}
					</Typography>

					<Typography sx={PageHomeSubtitleStyle}>{t('subTitle')}</Typography>

					<Typography sx={PageHomeDescriptionStyle}>
						{t('description')}
					</Typography>
				</>

				<Box sx={PageHomeLinkContainerStyle} onClick={() => setOpenModal(true)}>
					<Typography sx={PageHomeLinkStyle}>{t('watchVideo')}</Typography>

					<Box className="play-icon" sx={PageHomeIconContainerStyle}>
						<PlayVideoIcon />
					</Box>
				</Box>
			</Box>
			<Box sx={PageHomeVideoContainerStyle}>
				<Box
					component="video"
					src="/assets/video/updatedhero.mp4"
					autoPlay
					muted
					playsInline
					sx={PageHomeVideoStyle}
				/>
			</Box>
		</Box>
	)
}

export default Section1
