import { Box } from '@mui/material'
import React from 'react'
import { CustomSlider } from '@/components/CustomSlider/CustomSlider'
import { itemsSliderSection5 } from '@/constants'
import { useWindowSize } from '@/hooks/useWindowsSize'

/**
 * Section 5 component of the PageHome page. It renders a CustomSlider component if the screen width is greater than 768px.
 * @returns {JSX.Element | null} The CustomSlider component or null if the screen width is less than or equal to 768px.
 */
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
