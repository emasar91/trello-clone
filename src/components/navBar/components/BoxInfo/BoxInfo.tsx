'use client'

import { Drawer } from '@mui/material'
import { useStoreTrello } from '@/context/useStoreTrello'
import { BoxInfoContainerStyle } from './BoxInfo.style'

/**
 * BoxInfo component that renders a Drawer containing additional information
 * when the drawer is open. Utilizes Zustand for state management.
 *
 * - Logs the itemsBoxInfo to the console for debugging purposes.
 * - Returns null if the drawer is not open.
 *
 * @returns {React.ReactElement | null} The Drawer component when open, otherwise null.
 */

const BoxInfo = () => {
	const { drawerOpen, setDrawerOpen, itemsBoxInfo } = useStoreTrello()
	console.log('🚀 ~ BoxInfo ~ itemsBoxInfo:', itemsBoxInfo)

	if (!drawerOpen) return null

	return (
		<Drawer
			open={drawerOpen}
			onClose={() => setDrawerOpen(false)}
			anchor="top"
			sx={BoxInfoContainerStyle}
		>
			asdasd
		</Drawer>
	)
}

export default BoxInfo
