import { IExtraInfo } from '@/types/navBar'
import { Box, Link, Typography } from '@mui/material'
import {
	ExtraInfoButtonStyle,
	ExtraInfoContainerLinkStyle,
	ExtraInfoDescriptionStyle,
	ExtraInfoItemContainerStyle,
	ExtraInfoItemDescriptionStyle,
	ExtraInfoItemTitleStyle,
	ExtraInfoLinkStyle,
	ExtraInfoStyle,
	ExtraInfoTitleStyle,
} from './ExtaInfo.style'
import { useTranslations } from 'next-intl'
import { ArrowRight } from '@/public/assets/ArrowRight'
import { colors } from '@/constants'

type Props = {
	data: IExtraInfo
	tabSelected: string
}

const Info = ({ data, tabSelected }: Props) => {
	console.log('🚀 ~ Info ~ data:', data)
	const t = useTranslations(`Drawer.${tabSelected}`)
	return (
		<Box sx={ExtraInfoStyle}>
			<Typography variant="h3" sx={ExtraInfoTitleStyle}>
				{t(`${data.title}`)}
			</Typography>

			{data.description && (
				<Typography component="p" sx={ExtraInfoDescriptionStyle}>
					{t(`${data.description}`)}
				</Typography>
			)}

			{data.button && (
				<Link
					href={data.buttonLink ? t(data.buttonLink) : '/'}
					sx={ExtraInfoButtonStyle}
				>
					{t(`${data.button}`)}
				</Link>
			)}

			{data.items && (
				<Box>
					{data.items.map((item, index) => (
						<Box key={`index-${index}`} sx={ExtraInfoItemContainerStyle}>
							<Box key={`index-${index}-${item.title}`}>
								<Box
									sx={{
										display: 'flex',
									}}
								>
									<Typography variant="h3" sx={ExtraInfoItemTitleStyle}>
										{t(`items.${item.title}`)}
									</Typography>
									<Box
										className="hover-arrow"
										sx={{
											transition: 'all 0.3s ease',
											opacity: 0,
											color: 'primary.main',
											fontSize: '1.2rem',
											...ExtraInfoItemTitleStyle,
										}}
									>
										<ArrowRight color={colors.violet} />
									</Box>
								</Box>
								<Typography component="p" sx={ExtraInfoItemDescriptionStyle}>
									{t(`items.${item.description}`)}
								</Typography>
							</Box>
						</Box>
					))}
				</Box>
			)}

			{data.link && (
				<Box
					sx={{
						...ExtraInfoContainerLinkStyle,
						display: 'flex',
						alignItems: 'center',
						'&:hover .hover-arrow': {
							transform: 'translateX(5px)',
						},
					}}
				>
					<Link href={t(`${data.link}`)} sx={ExtraInfoLinkStyle}>
						{t(`${data.linkText}`)}
					</Link>

					<Box
						className="hover-arrow"
						sx={{
							transition: 'transform 0.3s ease',
							fontSize: '1.2rem',
							marginLeft: '0.5rem',
							...ExtraInfoItemTitleStyle,
							padding: '0',
						}}
					>
						<ArrowRight color={colors.blue} />
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default Info
