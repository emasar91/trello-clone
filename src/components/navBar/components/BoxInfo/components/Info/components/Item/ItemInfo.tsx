import { colorsLanding } from '@/constants'
import { IconsDrawer } from '@/public/assets/icons/IconsDrawer'
import { IDataInfo } from '@/types/navBar'
import { Box, Link, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import {
	ItemInfoContainerStyle,
	ItemInfoDescriptionStyle,
	ItemInfoTitleContainerStyle,
	ItemInfoTitleIconStyle,
	ItemInfoTitleStyle,
} from './ItemInfo.styles'

type Props = { data: IDataInfo; tabSelected: string }

/**
 * ItemInfo component that renders a Link with a title and description.
 *
 * @param {Props} props
 * @prop {IDataInfo} data - The data object containing the title, description, and link of the item.
 * @prop {string} tabSelected - The selected tab in the drawer.
 *
 * @returns {React.ReactElement} The ItemInfo component.
 */
const ItemInfo = ({ data, tabSelected }: Props) => {
	const t = useTranslations(`Drawer.${tabSelected}.info`)

	const colorHover = {
		1: colorsLanding.itemHover1,
		2: colorsLanding.itemHover2,
		3: colorsLanding.itemHover3,
		4: colorsLanding.itemHover4,
		5: colorsLanding.itemHover5,
		6: colorsLanding.itemHover6,
	}

	const [hoverColor, setHoverColor] = useState('')

	const getRandomColor = () => {
		const values = Object.values(colorHover)
		return values[Math.floor(Math.random() * values.length)]
	}

	return (
		<>
			{(data.items ?? []).map((item, index) => (
				<Box
					component={Link}
					href={t(`items.${item.link}`)}
					key={`index-${index}`}
					sx={ItemInfoContainerStyle(hoverColor)}
					onMouseEnter={() => setHoverColor(() => getRandomColor())}
					onMouseLeave={() => setHoverColor('')}
				>
					<Box sx={ItemInfoTitleContainerStyle}>
						{item.icon && (
							<Box sx={ItemInfoTitleIconStyle}>
								<IconsDrawer icon={item.icon as string} />
							</Box>
						)}
						<Typography component={'p'} sx={ItemInfoTitleStyle}>
							{t(`items.${item.title}`)}
						</Typography>
					</Box>
					<Box>
						<Typography component={'p'} sx={ItemInfoDescriptionStyle}>
							{t(`items.${item.description}`)}
						</Typography>
					</Box>
				</Box>
			))}
		</>
	)
}

export default ItemInfo
