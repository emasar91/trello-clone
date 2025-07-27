import { ITabItem } from '@/types/navBar'
import { Box } from '@mui/material'
import React from 'react'

type Props = {
	data: { title: string | undefined; items: ITabItem[] | undefined }
}

const Info = ({ data }: Props) => {
	console.log('🚀 ~ Info ~ data:', data)
	return <Box>Info</Box>
}

export default Info
