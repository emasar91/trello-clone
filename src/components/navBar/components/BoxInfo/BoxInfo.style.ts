import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const BoxInfoContainerStyle: SxProps<Theme> = {
	'.MuiDrawer-paper': { marginTop: '60px !important', width: '100%' },
}

export const BoxInfoContentStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'start',
	justifyContent: 'start',
	flexDirection: 'row',
	width: '100%',
}

export const BoxInfoLeftStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 'calc(237.5px + 50vw)',
	backgroundColor: colors.white,
	padding: '2rem 0px 4.75rem',
}

export const BoxInfoRightStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 'calc(-237.5px + 50vw)',
	backgroundColor: colors.gray,
	padding: '2rem 0px 4.75rem',
}

export const BoxInfoLeftContentStyle: SxProps<Theme> = {
	margin: '0px 47.5px 0px auto',
	width: '760px',
}

export const BoxInfoRightContentStyle: SxProps<Theme> = {
	margin: '0px auto 0px calc(47.5px - 1rem)',
	width: '285px',
}
