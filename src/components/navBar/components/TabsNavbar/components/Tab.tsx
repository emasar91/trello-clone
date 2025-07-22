import { ITab, TabsOptions } from '@/types/navBar'
import { Button } from '@mui/material'
import React from 'react'
import { ArrowDown } from '@/components/Icons/ArrowDown'
import { colors } from '@/constants'
import { useTranslations } from 'next-intl'

type Props = {
	tab: ITab
	selected: boolean
	handleChange: (value: TabsOptions) => void
}

const Tab = ({ tab, selected, handleChange }: Props) => {
	const buttonDrawer = tab.drawer

	const t = useTranslations('NavBar.tabs')

	return (
		<Button
			id="demo-customized-button"
			variant="text"
			onClick={() => handleChange(tab.tab as TabsOptions)}
			disableRipple
			sx={{
				fontSize: '16px',
				lineHeight: '24px',
				width: 'auto',
				padding: '16px',
				display: 'flex',
				alignItems: 'center',
				gap: '4px',
				fontWeight: '400',
				color: selected ? colors.textNavbarSelected : colors.textNavbar,
				borderBottom: selected
					? `2px solid ${colors.textNavbarSelected}`
					: 'none',
				borderRadius: '0px',
				boxSizing: 'border-box',
				'&:hover': {
					backgroundColor: 'transparent',
					color: colors.textNavbarSelected,
				},
			}}
		>
			{t(tab.tab)}
			{buttonDrawer && <ArrowDown />}
		</Button>
	)
}

export default Tab
