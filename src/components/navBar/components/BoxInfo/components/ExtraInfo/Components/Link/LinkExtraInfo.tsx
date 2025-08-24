import { colors } from '@/constants'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'
import { Box, Link } from '@mui/material'
import React from 'react'
import {
	ExtraInfoContainerLinkStyle,
	ExtraInfoItemTitleStyle,
	ExtraInfoLinkStyle,
} from './LinkExtraInfo.styles'

type Props = { linkButton: string; linkTitle: string }

/**
 * LinkExtraInfo component renders a link with a hover arrow effect.
 *
 * @param {{linkButton: string, linkTitle: string}} props
 * @returns {JSX.Element}
 */
const LinkExtraInfo = ({ linkButton, linkTitle }: Props) => {
	return (
		<Box sx={ExtraInfoContainerLinkStyle}>
			<Link href={linkTitle} sx={ExtraInfoLinkStyle}>
				{linkButton}
			</Link>

			<Box className="hover-arrow" sx={ExtraInfoItemTitleStyle}>
				<ArrowRightIcon color={colors.primary} />
			</Box>
		</Box>
	)
}

export default LinkExtraInfo
