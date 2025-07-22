'use client'

import { Drawer } from '@mui/material'
import React from 'react'

const BoxInfo = () => {
	const [open, setOpen] = React.useState(false)

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen)
	}
	return (
		<Drawer
			open={true}
			onClose={toggleDrawer(false)}
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
