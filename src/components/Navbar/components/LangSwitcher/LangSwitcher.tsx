import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Box, Button, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { LangIcon } from '@/public/assets/icons/LangIcon'
import Typography from '@mui/material/Typography'
import { LangSwitcherContainerStyle } from './LangSwitcher.styles'

/**
 * LangSwitcher component
 *
 * This component shows a button with a flag representing the current
 * language of the website. When clicked, it shows a dropdown menu with
 * the available languages. When a language is selected, it redirects to
 * the same page with the selected language.
 *
 * @returns A Box component with a Button and a Menu component
 */
const LangSwitcher = () => {
	const router = useRouter()
	const pathname = usePathname()

	const changeLocale = (newLocale: string) => {
		const segments = pathname.split('/')
		segments[1] = newLocale
		const newPath = segments.join('/')
		router.replace(newPath)
	}

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box>
			<Button
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={LangSwitcherContainerStyle}
			>
				<LangIcon />
				<Typography>{useLocale().toUpperCase()}</Typography>
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						'aria-labelledby': 'basic-button',
					},
				}}
			>
				<MenuItem onClick={() => changeLocale('es')}>
					<Box
						component="img"
						loading="lazy"
						src="/assets/esp-flag.png"
						alt="es-flag"
						padding={0}
						width={30}
					/>
					Es
				</MenuItem>
				<MenuItem onClick={() => changeLocale('en')}>
					<Box
						component="img"
						loading="lazy"
						src="/assets/eng-flag.png"
						alt="es-flag"
						width={30}
						padding={0}
					/>
					En
				</MenuItem>
			</Menu>
		</Box>
	)
}

export default LangSwitcher
