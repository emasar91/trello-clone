import { IconsDrawer } from '@/public/assets/icons/IconsDrawer'
import { IDataInfo } from '@/types/navBar'
import { Box, Link, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import {
	ItemFullWidthButtonStyle,
	ItemFullWidthContainerStyle,
	ItemFullWidthContentContainerStyle,
	ItemFullWidthDescriptionStyle,
	ItemFullWidthIconContainerStyle,
	ItemFullWidthTitleContainerStyle,
	ItemFullWidthTitleStyle,
} from './ItemFullWidth.styles'

type Props = { data: IDataInfo; tabSelected: string; mobileMenu?: boolean }

/**
 * ItemFullWidth is a MUI Box component that renders a full-width item for the drawer,
 * including an icon, title, description, and button.
 *
 * @param {Props} props - The props for the component.
 * @param {IDataInfo} props.data - The data for the drawer.
 * @param {string} props.tabSelected - The currently selected tab.
 *
 * @returns {ReactElement} - The rendered component.
 */
const ItemFullWidth = ({ data, tabSelected, mobileMenu = false }: Props) => {
	const t = useTranslations(`Drawer.${tabSelected}.info`)

	return (
		<Box sx={ItemFullWidthContainerStyle}>
			{(data.itemsFullWidth ?? []).map((item, index) => (
				<Box
					key={`index-${index}`}
					sx={ItemFullWidthContentContainerStyle(mobileMenu)}
				>
					<Box key={`index-${index}`} sx={{ marginTop: '-1rem' }}>
						<Box sx={ItemFullWidthTitleContainerStyle}>
							{item.icon && (
								<Box sx={ItemFullWidthIconContainerStyle}>
									<IconsDrawer icon={item.icon as string} />
								</Box>
							)}
							<Typography component={'p'} sx={ItemFullWidthTitleStyle}>
								{t(`items.${item.title}`)}
							</Typography>
						</Box>
						<Box>
							<Typography component={'p'} sx={ItemFullWidthDescriptionStyle}>
								{t(`items.${item.description}`)}
							</Typography>
						</Box>
					</Box>
					<Box
						component={Link}
						href={'/' + t(`items.${item.link}`)}
						sx={ItemFullWidthButtonStyle}
					>
						{t(`items.${item.button}`)}
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default ItemFullWidth
