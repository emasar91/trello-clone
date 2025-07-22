'use client'

import { Drawer } from '@mui/material'
import { useStoreTrello } from '@/context/useStoreTrello'

const BoxInfo = () => {
	const { drawerOpen, setDrawerOpen } = useStoreTrello()

	if (!drawerOpen) return null

	return (
		<Drawer
			open={drawerOpen}
			onClose={() => setDrawerOpen(false)}
			anchor="top"
			sx={{
				'.MuiDrawer-paper': { marginTop: '60px !important' },
			}}
		>
			asddd
		</Drawer>
	)
}

export default BoxInfo
