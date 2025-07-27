'use client'

import { Box, Drawer } from '@mui/material'
import { useStoreTrello } from '@/context/useStoreTrello'
import {
	BoxInfoContainerStyle,
	BoxInfoContentStyle,
	BoxInfoLeftContentStyle,
	BoxInfoLeftStyle,
	BoxInfoRightContentStyle,
	BoxInfoRightStyle,
} from './BoxInfo.style'
import Info from './components/Info/Info'

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
	const { drawerOpen, setDrawerOpen, boxInfo } = useStoreTrello()
	console.log('🚀 ~ BoxInfo ~ itemsBoxInfo:', boxInfo)

	const dataInfo = { title: boxInfo?.title, items: boxInfo?.items }

	if (!drawerOpen) return null

	return (
		<Drawer
			open={drawerOpen}
			onClose={() => setDrawerOpen(false)}
			anchor="top"
			sx={BoxInfoContainerStyle}
		>
			<Box sx={BoxInfoContentStyle}>
				<Box sx={BoxInfoLeftStyle}>
					<Box sx={BoxInfoLeftContentStyle}>
						<Info data={dataInfo} />
					</Box>
				</Box>
				<Box sx={BoxInfoRightStyle}>
					<Box sx={BoxInfoRightContentStyle}>derecho</Box>
				</Box>
			</Box>
		</Drawer>
	)
}

export default BoxInfo
