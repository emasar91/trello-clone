import { Box } from '@mui/material'
import React from 'react'
import {
	PageContainerChildStyle,
	PageContainerStyle,
} from './PageContainer.styles'

type Props = {
	children: React.ReactNode
	backgroundColor?: string
	margin?: string
}

/**
 * PageContainer es un contenedor que envuelve el contenido de la página en un Box.
 * Proporciona un estilo consistente para el contenido de la página, como el color de fondo, el ancho y la alineación.
 * También proporciona un Box hijo que se puede usar para envolver el contenido de la página.
 * El Box hijo se estiliza con un relleno consistente y un maxWidth.
 * PageContainer no proporciona ninguna prop adicional más allá de lo que está disponible en el componente Box.
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
const PageContainer = ({ children, backgroundColor, margin }: Props) => {
	return (
		<Box sx={PageContainerStyle(backgroundColor, margin)}>
			<Box sx={PageContainerChildStyle}>{children}</Box>
		</Box>
	)
}

export default PageContainer
