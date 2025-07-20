import { ITab } from '@/types/navBar'
import { Button } from '@mui/material'
import React from 'react'
import { ArrowDown } from '@/components/Icons/ArrowDown'
import { colors } from '@/constants'
import { useTranslations } from 'next-intl'

type Props = {
	tab: ITab
	selected: boolean
	handleChange: (event: React.SyntheticEvent, newValue: number) => void
	value: number
}

const Tab = ({ tab, selected, handleChange, value }: Props) => {
	console.log('🚀 ~ Tab ~ selected:', tab.tab)
	const buttonDrawer = tab.drawer

	const t = useTranslations('NavBar.tabs')
	return (
		<Button
			id="demo-customized-button"
			variant="text"
			onClick={(e) => handleChange(e, value)}
			disableRipple
			sx={{
				fontSize: '16px',
				width: 'auto',
				padding: '16px',
				display: 'flex',
				alignItems: 'center',
				gap: '4px',
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
