import { SxProps, Theme } from '@mui/material'

export const buttonStyles = ({
	active,
	cursor,
	theme,
}: {
	active?: { fill?: string; background?: string }
	cursor?: string
	theme: Theme
}): SxProps<Theme> => ({
	display: 'flex',
	width: '12px',
	p: '15px',
	alignItems: 'center',
	justifyContent: 'center',
	flex: '0 0 auto',
	touchAction: 'none',
	borderRadius: '5px',
	backgroundColor: 'transparent',
	cursor: cursor ?? 'pointer',
	'--fill': active?.fill,
	'--background': active?.background,

	// Hover
	'&:hover': {
		backgroundColor: 'rgba(0,0,0,0.05)',
		'& svg': {
			fill: '#6f7b88',
		},
	},

	// SVG default
	'& svg': {
		flex: '0 0 auto',
		m: 'auto',
		height: '100%',
		overflow: 'visible',
		fill: '#919eab',
	},

	// Focus visible
	'&.Mui-focusVisible': {
		boxShadow: `
	    0 0 0 2px rgba(255,255,255,0),
	    0 0 0 2px ${theme.palette.primary.main}
	  `,
	},

	// Active
	'&:active svg': {
		backgroundColor: 'var(--background, rgba(0, 0, 0, 0.05))',
	},
})
