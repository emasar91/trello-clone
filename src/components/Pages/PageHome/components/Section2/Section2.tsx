import { Box, Typography } from '@mui/material'
import {
	Section2DescriptionStyle,
	Section2SubtitleStyle,
	Section2TextContainerStyle,
	Section2TextContentStyle,
	Section2TitleStyle,
} from './Section2.styles'
import { useTranslations } from 'next-intl'
import { CustomSlider } from '@/components/CustomSlider/CustomSlider'

const items = [
	{
		title: 'Inbox',
		desc: 'When it’s on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.',
		image: '/assets/inbox-slider.webp',
	},
	{
		title: 'Boards',
		desc: 'Your to-do list may be long, but it can be manageable! Keep tabs on everything from "to-dos to tackle" to "mission accomplished!”',
		image: '/assets/board-slider.webp',
	},
	{
		title: 'Planner',
		desc: 'Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.',
		image: '/assets/planner-slider.webp',
	},
]

export default function FeatureSlider() {
	const t = useTranslations('PageHome.section2')

	return (
		<Box>
			<Box sx={Section2TextContainerStyle}>
				<Box sx={Section2TextContentStyle}>
					<Box>
						<Typography component="p" sx={Section2SubtitleStyle}>
							{t('subTitle')}
						</Typography>
						<Typography component={'h2'} sx={Section2TitleStyle}>
							{t('title')}
						</Typography>
					</Box>

					<Box>
						<Typography sx={Section2DescriptionStyle}>
							{t('description')}
						</Typography>
					</Box>
				</Box>
			</Box>
			<CustomSlider showLeftItems={true} items={items} />
		</Box>
	)
}
