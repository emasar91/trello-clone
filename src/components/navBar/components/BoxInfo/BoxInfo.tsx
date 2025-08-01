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
import ExtraInfo from './components/ExtraInfo/ExtraInfo'

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
	const { drawerOpen, setDrawerOpen, boxInfo, tabSelected } = useStoreTrello()
	console.log('🚀 ~ BoxInfo ~ itemsBoxInfo:', boxInfo)

	const dataInfo = {
		title: boxInfo?.title,
		items: boxInfo?.items,
	}

	const dataExtraInfo = {
		title: boxInfo?.extraInfo?.title || '',
		description: boxInfo?.extraInfo?.description,
		button: boxInfo?.extraInfo?.button,
		link: boxInfo?.extraInfo?.link,
		items: boxInfo?.extraInfo?.items,
		buttonLink: boxInfo?.extraInfo?.buttonLink || '/',
		linkText: boxInfo?.extraInfo?.linkText,
	}

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
						<Info data={dataInfo} tabSelected={tabSelected} />
					</Box>
				</Box>
				<Box sx={BoxInfoRightStyle}>
					<Box sx={BoxInfoRightContentStyle}>
						<ExtraInfo data={dataExtraInfo} tabSelected={tabSelected} />
					</Box>
				</Box>
			</Box>
		</Drawer>
	)
}

export default BoxInfo
