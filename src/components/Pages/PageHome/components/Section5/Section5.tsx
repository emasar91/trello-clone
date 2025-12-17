import { Box } from '@mui/material'
import React from 'react'
import { CustomSlider } from '@/components/CustomSlider/CustomSlider'
import { itemsSliderSection5 } from '@/constants'
import { useWindowSize } from '@/hooks/useWindowsSize'

/**
 * Section 5 es el componente de la seccion 5 de la pagina de inicio.
 * Renderiza un CustomSlider si el ancho de la pantalla es mayor a 768px.
 * @returns {JSX.Element | null} El CustomSlider o null si el ancho de la pantalla es menor o igual a 768px.
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
