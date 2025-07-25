import { Box } from '@mui/material'
import React from 'react'
import {
	PageContainerChildStyle,
	PageContainerStyle,
} from './PageContainer.style'

type Props = {
	children: React.ReactNode
}

/**
 * PageContainer is a container component that wraps the page content in a Box.
 * It provides consistent styling for the page content, such as background color, width, and alignment.
 * It also provides a child Box that can be used to wrap the page content.
 * The child Box is styled with consistent padding and a maxWidth.
 * PageContainer does not provide any additional props beyond what is available on the Box component.
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
const PageContainer = ({ children }: Props) => {
	return (
		<Box sx={PageContainerStyle}>
			<Box sx={PageContainerChildStyle}>{children}</Box>
		</Box>
	)
}

export default PageContainer
