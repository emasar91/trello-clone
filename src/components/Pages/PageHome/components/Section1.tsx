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

const Section1 = () => {
	const { setOpenModal } = useStoreTrello()
	const t = useTranslations('PageHome')
	return (
		<Box sx={PageHomeContainerStyle}>
			<Box sx={PageHomeContentStyle}>
				<Box>
					<Typography variant="h1" sx={PageHomeTitleStyle}>
						{t('title')}
					</Typography>
					<Typography sx={PageHomeSubtitleStyle}>{t('subTitle')}</Typography>
					<Typography sx={PageHomeDescriptionStyle}>
						{t('description')}
					</Typography>
				</Box>

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
