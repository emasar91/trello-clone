'use client'

import { Box, Link, List, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'
import { tabsNavbar } from '@/constants'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'
import MobileMenu from './components/MobileMenu/MobileMenu'
import { ITab } from '@/types/navBar'
import { useRouter } from 'next/navigation'
import {
	NavBarMobileButtonloginStyle,
	NavBarMobileButtonRegisterStyle,
	NavBarMobileButtonsContainerStyle,
	NavBarMobileContainerItemMenuStyle,
	NavBarMobileContainerListStyle,
	NavBarMobileExpandableMenuContainerStyle,
	NavBarMobileExpandableMenuContentStyle,
	NavBarMobileTextItemsStyle,
} from './NavBar.styles'
import { useTranslations } from 'next-intl'

type Props = {
	open: boolean
	navbarHeight?: number
	submenuOpen: boolean
	setSubmenuOpen: (open: boolean) => void
}

/**
 * ExpandableMenu component
 *
 * @param {boolean} open - Whether the menu is open
 * @param {number} navbarHeight - The height of the navbar
 * @param {boolean} submenuOpen - Whether the submenu is open
 * @param {(open: boolean) => void} setSubmenuOpen - Function to set the submenu open state
 * @returns {JSX.Element} The rendered ExpandableMenu component
 *@example
 *<ExpandableMenu open={open} navbarHeight={60} submenuOpen={submenuOpen} setSubmenuOpen={setSubmenuOpen} />
 * This component renders a menu with items from the tabsNavbar constant.
 * It also renders a submenu with the same items when a drawer item is clicked.
 * The submenu is rendered inside a Box with width 100% and overflow auto.
 */
export function ExpandableMenu({
	open,
	navbarHeight = 60,
	submenuOpen,
	setSubmenuOpen,
}: Props) {
	const items = tabsNavbar
	const router = useRouter()
	const t = useTranslations('NavBarLogin.buttonLogin')

	const [selectedTab, setSelectedTab] = useState<ITab | null>(null)

	return (
		<Box sx={NavBarMobileExpandableMenuContainerStyle(navbarHeight, open)}>
			<Box sx={NavBarMobileExpandableMenuContentStyle(submenuOpen)}>
				<Box width={'100%'} overflow={'auto'}>
					<List disablePadding sx={NavBarMobileContainerListStyle}>
						{items.map((item, index) => (
							<ListItemButton
								key={item.tab}
								sx={NavBarMobileContainerItemMenuStyle(
									open,
									index,
									items.length - 1 === index
								)}
								onClick={() => {
									setSelectedTab(item as ITab)
									if (item.drawer) {
										setSubmenuOpen(true)
									} else {
										router.push(`/mock/${item.tab}`)
									}
								}}
							>
								<ListItemText
									primary={item.tab.charAt(0).toUpperCase() + item.tab.slice(1)}
									sx={NavBarMobileTextItemsStyle}
								/>
								{item.drawer ? <ArrowRightIcon /> : null}
							</ListItemButton>
						))}
					</List>

					<Box sx={NavBarMobileButtonsContainerStyle}>
						<Box
							component={Link}
							href={'/login'}
							sx={NavBarMobileButtonloginStyle}
						>
							{t('login')}
						</Box>
						<Box
							component={Link}
							href={'/register'}
							sx={NavBarMobileButtonRegisterStyle}
						>
							{t('getFree')}
						</Box>
					</Box>
				</Box>

				<Box width={'100%'}>
					<MobileMenu tabSelected={selectedTab} open={submenuOpen} />
				</Box>
			</Box>
		</Box>
	)
}
