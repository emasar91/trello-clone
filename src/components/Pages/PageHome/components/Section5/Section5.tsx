import { Box } from '@mui/material'
import React from 'react'
import { CustomSlider } from '@/components/CustomSlider/CustomSlider'
import { itemsSliderSection5 } from '@/constants'
import { useWindowSize } from '@/hooks/useWindowsSize'

const Section5 = () => {
	const width = useWindowSize()

	return width !== null && width > 768 ? (
		<Box>
			<CustomSlider
				items={itemsSliderSection5}
				showLeftItems={false}
				translate={'PageHome.section5.slider.items'}
			/>
		</Box>
	) : null
}

export default Section5
