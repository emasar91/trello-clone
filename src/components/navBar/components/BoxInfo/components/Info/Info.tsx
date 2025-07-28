import { ITabItem } from '@/types/navBar'
import { Box, Typography } from '@mui/material'
import { InfoStyle, InfoTitleStyle } from './Info.style'
import { useTranslations } from 'next-intl'

type Props = {
	data: { title: string | undefined; items: ITabItem[] | undefined }
	tabSelected: string
}

const Info = ({ data, tabSelected }: Props) => {
	console.log('🚀 ~ Info ~ data:', data)
	const t = useTranslations(`Drawer.${tabSelected}`)
	return (
		<Box sx={InfoStyle}>
			{data.title && (
				<Typography variant="h3" sx={InfoTitleStyle}>
					{t(`${data.title}`)}
				</Typography>
			)}
		</Box>
	)
}

export default Info
