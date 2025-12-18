import { IconsDrawer } from '@/public/assets/icons/IconsDrawer'
import { Box, Link, List, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import { ITab } from '@/types/navBar'
import ItemFullWidth from '../BoxInfo/components/Info/components/ItemFullWidth/ItemFullWidth'
import ExtraInfo from '../BoxInfo/components/ExtraInfo/ExtraInfo'
import {
	MobileMenuContainerStyle,
	MobileMenuDescriptionItemStyle,
	MobileMenuExtraInfoStyle,
	MobileMenuItemStyle,
	MobileMenuListStyle,
	MobileMenuTitleContainerStyle,
	MobileMenuTitleItemStyle,
	MobileMenuTitleStyle,
} from './MobileMenu.styles'

type Props = {
	tabSelected: ITab | null
	open: boolean
}

/**
 * MobileMenu is a MUI Box component that renders a mobile menu for the drawer,
 * including an icon, title, description, and button.
 *
 * @param {Props} props - The component props
 * @param {ITab | null} props.tabSelected - The currently selected tab
 * @param {boolean} props.open - Whether the menu is open
 *
 * @returns {React.ReactElement} The rendered component
 *
 * @example
 * <MobileMenu tabSelected="gettingStarted" open={true} />
 */
function MobileMenu({ tabSelected, open }: Props) {
	const t = useTranslations('Drawer')
	const tt = `${tabSelected?.tab}.info`

	const scrollRef = useRef<HTMLDivElement | null>(null)

	const items = tabSelected?.drawer?.items

	const itemsFullWidth = tabSelected?.drawer?.itemsFullWidth

	const itemsExtraInfo = tabSelected?.drawer?.extraInfo

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({ top: 0, behavior: 'auto' })
		}
	}, [open])

	return (
		<Box ref={scrollRef} sx={MobileMenuContainerStyle}>
			<List disablePadding sx={MobileMenuListStyle}>
				<Box marginBottom={'1rem'}>
					{tabSelected?.drawer?.title && (
						<Typography component={'p'} sx={MobileMenuTitleStyle}>
							{t(tt + '.' + tabSelected?.drawer?.title)}
						</Typography>
					)}
					{items?.map((item, index) => {
						return (
							<Box
								component={Link}
								href={'/' + t(tt + '.items.' + item?.link)}
								key={`index-${index}`}
								sx={MobileMenuItemStyle}
							>
								<Box sx={MobileMenuTitleContainerStyle}>
									{item?.icon && (
										<Box>
											<IconsDrawer icon={item.icon as string} />
										</Box>
									)}
									{item?.title && (
										<Typography component={'p'} sx={MobileMenuTitleItemStyle}>
											{t(tt + '.items.' + item?.title)}
										</Typography>
									)}
								</Box>
								<Box>
									{item?.description && (
										<Typography
											component={'p'}
											sx={MobileMenuDescriptionItemStyle}
										>
											{t(tt + '.items.' + item?.description)}
										</Typography>
									)}
								</Box>
							</Box>
						)
					})}
				</Box>

				{tabSelected?.drawer && itemsFullWidth && (
					<ItemFullWidth
						data={tabSelected.drawer}
						tabSelected={tabSelected.tab}
						mobileMenu={true}
					/>
				)}

				<Box sx={MobileMenuExtraInfoStyle}>
					{itemsExtraInfo && (
						<ExtraInfo
							data={itemsExtraInfo}
							tabSelected={tabSelected?.tab}
							key={`index-${itemsExtraInfo}`}
							mobileMenu={true}
						/>
					)}
				</Box>
			</List>
		</Box>
	)
}

export default MobileMenu
