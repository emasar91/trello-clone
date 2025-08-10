import { colors } from '@/constants'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'
import { IExtraInfo } from '@/types/navBar'
import { Box, Link, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import {
	ExtraInfoItemContainerStyle,
	ExtraInfoItemDescriptionStyle,
	ExtraInfoItemTitleStyle,
} from './ItemExtraInfo.styles'

type Props = { data: IExtraInfo; tabSelected: string }

/**
 * ItemExtraInfo component
 *
 * @param {Props} props - The component props
 * @returns {React.ReactElement} The ItemExtraInfo component
 *
 * @example
 * <ItemExtraInfo data={data} tabSelected="gettingStarted" />
 */
const ItemExtraInfo = ({ data, tabSelected }: Props) => {
	const t = useTranslations(`Drawer.${tabSelected}.extraInfo`)

	return (
		<Box>
			{(data.items ?? []).map((item, index) => (
				<Box
					key={`index-${index}`}
					sx={ExtraInfoItemContainerStyle}
					component={Link}
					href={t(`items.${item.link}`)}
				>
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
								<ArrowRightIcon color={colors.violet} />
							</Box>
						</Box>
						<Typography component="p" sx={ExtraInfoItemDescriptionStyle}>
							{t(`items.${item.description}`)}
						</Typography>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default ItemExtraInfo
