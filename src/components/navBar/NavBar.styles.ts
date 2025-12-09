import { colorsLanding } from '@/constants'
import { CSSProperties, SxProps, Theme } from '@mui/material'
import { SystemStyleObject } from '@mui/system'

export const NavBarContainerStyle: SxProps<Theme> = {
	position: 'fixed',
	top: '0px',
	display: 'flex',
	width: '100%',
	zIndex: '1300',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: colorsLanding.backgroundNavbar,
	boxShadow: `'0 0 ${colorsLanding.shadow}, 0 0 ${colorsLanding.shadow}, 0 10px 15px -3px ${colorsLanding.shadow}, 0 4px 6px -4px ${colorsLanding.shadow}'`,
}

export const NavBarRowStyle = (width: boolean): SxProps<Theme> => ({
	display: 'flex',
	width: '100%',
	maxWidth: '1320px',
	justifyContent: 'space-between',
	overflow: 'hidden',
	backgroundColor: colorsLanding.backgroundNavbar,
	alignItems: 'stretch',
	height: width ? '70px' : '60px',
	margin: '0px auto',
})

export const NavBarRowContentStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	height: '60px',
}

export const NavBarButtonsLoginStyle: SxProps<Theme> = {
	marginLeft: 'auto',
	display: 'flex',
	alignItems: 'stretch',
}

// export const NavBarLogoStyle: SxProps<Theme> = {
// 	alignItems: 'center',
// 	alignSelf: 'stretch',
// 	display: 'flex',
// 	padding: '1rem',
// }

export const NavBarRegisterStyle: SxProps<Theme> = {
	backgroundColor: colorsLanding.loginButton,
	WebkitBoxAlign: 'center',
	alignItems: 'center',
	alignSelf: 'stretch',
	color: colorsLanding.textLoginButton,
	display: 'flex',
	fontSize: '1.2rem',
	height: '100%',
	padding: '0.5rem 1.5rem',
	textDecoration: 'none',
}

export const NavBarLoginStyle: SxProps<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	color: colorsLanding.textTabs,
	display: 'flex',
	fontSize: '1.2rem',
	height: '100%',
	padding: '0.5rem 1.5rem',
	textDecoration: 'none',
}

export const NavBarLangSwitcherStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
}

// 🔵 Mantiene tu estilo actual, y solo agregamos animación
export const NavBarLogoStyle: SystemStyleObject<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	display: 'flex',
	padding: '1rem',
	position: 'absolute',
	left: 0,
	transition: 'transform 300ms ease, opacity 300ms ease',
}

// 🟢 Estados del logo
export const logoVisible: SystemStyleObject<Theme> = {
	transform: 'translateX(0)',
	opacity: 1,
}

export const logoHidden: SystemStyleObject<Theme> = {
	transform: 'translateX(-100%)',
	opacity: 0,
}

// 🟡 Estilos del botón “atrás”
export const backBase: SystemStyleObject<Theme> = {
	position: 'absolute',
	left: 0,
	top: '50%',
	transform: 'translateY(-50%) translateX(100%)',
	transition: 'transform 300ms ease, opacity 300ms ease',
	cursor: 'pointer',
	color: 'black',
	padding: '1rem',
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
}

// 🔁 Estados del botón atrás
export const backVisible: SystemStyleObject<Theme> = {
	transform: 'translateY(-50%) translateX(0)',
	opacity: 1,
}

export const backHidden: SystemStyleObject<Theme> = {
	transform: 'translateY(-50%) translateX(100%)',
	opacity: 0,
}

export const logoContainerStyle: SystemStyleObject<Theme> = {
	display: 'flex',
	position: 'relative',
	width: 200,
	overflow: 'hidden',
}

export const logoMobile: CSSProperties = {
	textDecoration: 'none',
	width: '100%',
}

export const NavBarBurguerMenuContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	padding: '1rem',
}

export const NavBarMobileTextItemsStyle: SxProps<Theme> = {
	'.MuiListItemText-primary': {
		fontSize: '1.3rem !important',
	},
}

export const NavBarMobileContainerItemMenuStyle = (
	open: boolean,
	index: number,
	borderBottom: boolean
): SxProps<Theme> => ({
	minHeight: '70px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	padding: '0',
	borderTop: open ? '1px solid rgba(0,0,0,0.1)' : 'none',
	marginTop: '10px',
	borderBottom: borderBottom ? '1px solid rgba(0,0,0,0.1)' : 'none',
})

export const NavBarMobileContainerListStyle: SxProps<Theme> = {
	margin: '0 1rem',
}

export const NavBarMobileExpandableMenuContainerStyle = (
	navbarHeight: number,
	open: boolean
): SxProps<Theme> => ({
	position: 'fixed',
	top: navbarHeight,
	left: 0,
	right: 0,
	backgroundColor: colorsLanding.backgroundNavbar,
	overflow: 'hidden',
	zIndex: 1200,
	height: open ? `calc(100vh - ${navbarHeight}px)` : 0,
	transition: 'height .35s ease',
})

export const NavBarMobileExpandableMenuContentStyle = (
	submenuOpen: boolean
): SxProps<Theme> => ({
	display: 'flex',
	width: '200%',
	height: '100%',
	transform: submenuOpen ? 'translateX(-50%)' : 'translateX(0)',
	transition: 'transform .35s ease',
})

export const NavBarMobileButtonsContainerStyle: SxProps<Theme> = {
	display: 'flex',
	gap: '1rem',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	margin: '1rem',
}

export const NavBarMobileButtonloginStyle: SxProps<Theme> = {
	alignItems: 'center',
	color: colorsLanding.textLoginButton,
	display: 'flex',
	fontSize: '1.2rem',
	padding: '0.5rem 1.5rem',
	textDecoration: 'none',
	height: '64px',
	width: '100%',
	backgroundColor: colorsLanding.loginButton,
	textAlign: 'center',
	margin: '0 auto',
	'&:link': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}

export const NavBarMobileButtonRegisterStyle: SxProps<Theme> = {
	alignItems: 'center',
	color: colorsLanding.textTabs,
	display: 'flex',
	fontSize: '1.2rem',
	padding: '0.5rem 1.5rem',
	textDecoration: 'none',
	height: '64px',
	width: '100%',
	border: '1px solid blue',
	textAlign: 'center',
	margin: '0 auto',
	'&:link': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}
