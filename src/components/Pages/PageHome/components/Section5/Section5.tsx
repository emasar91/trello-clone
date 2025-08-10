import { Box } from '@mui/material'
import React from 'react'
import { CustomSlider } from '@/components/CustomSlider/CustomSlider'
import { itemsSliderSection5 } from '@/constants'

const Section5 = () => {
	return (
		<Box>
			<CustomSlider
				items={itemsSliderSection5}
				showLeftItems={false}
				translate={'PageHome.section5.slider.items'}
			/>
		</Box>
	)
}

export default Section5
