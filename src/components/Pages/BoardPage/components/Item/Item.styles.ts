// Item.styles.ts
import { SxProps, Theme } from '@mui/material'
import type { Transform } from '@dnd-kit/utilities'

/**
 * Estilos del wrapper <li>
 */
export const wrapperStyles = (params: {
	transform?: Transform | null
	fadeIn?: boolean
	dragOverlay?: boolean
	transition?: string | null
	wrapperStyle?: React.CSSProperties
}): SxProps<Theme> => {
	const { transform, fadeIn, dragOverlay, transition, wrapperStyle } = params

	return {
		display: 'flex',
		boxSizing: 'border-box',
		touchAction: 'manipulation',
		transform: `
      translate3d(${transform ? Math.round(transform.x) + 'px' : 0},
                  ${transform ? Math.round(transform.y) + 'px' : 0},
                  0)
      scaleX(${transform?.scaleX ?? 1})
      scaleY(${transform?.scaleY ?? 1})
    `,
		transformOrigin: '0 0',

		...(fadeIn && { animation: 'fadeIn 500ms ease' }),

		...(dragOverlay && {
			'--scale': 1.05,
			'--box-shadow': `
        0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05),
        0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05)
      `,
			'--box-shadow-picked-up': `
        0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05),
        -1px 0 15px rgba(34,33,81,0.01),
        0px 15px 15px rgba(34,33,81,0.25)
      `,
			zIndex: 999,
		}),

		transition: [transition, wrapperStyle?.transition]
			.filter(Boolean)
			.join(', '),
	}
}

/**
 * Estilos del contenedor interno (item)
 */
export const itemStyles = (params: {
	transform?: Transform | null
	dragging?: boolean
	dragOverlay?: boolean
	disabled?: boolean
	theme: Theme
}): SxProps<Theme> => {
	const { transform, dragging, dragOverlay, disabled, theme } = params

	return {
		position: 'relative',
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		px: '20px',
		py: '2px',
		transformOrigin: '50% 50%',
		whiteSpace: 'nowrap',
		transform: `scale(${dragOverlay ? 'var(--scale)' : 1})`,
		transition: 'box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',

		boxShadow: `
      0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05),
      0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05)
    `,
		borderRadius: `calc(4px / ${transform?.scaleX ?? 1})`,

		'&:focus-visible': {
			boxShadow: `
        0 0px 4px 1px #4c9ffe,
        0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05),
        0 0 0 calc(1px / ${transform?.scaleX ?? 1}) rgba(63,63,68,0.05)
      `,
		},

		...(dragging &&
			!dragOverlay && {
				opacity: 'var(--dragging-opacity, 0.5)',
			}),

		...(disabled && {
			backgroundColor: '#f1f1f1',
			cursor: 'not-allowed',
		}),

		...(dragOverlay && {
			animation: 'pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)',
			boxShadow: 'var(--box-shadow-picked-up)',
			opacity: 1,
			cursor: 'inherit',
			color: theme.palette.boardPage,
		}),

		'&:hover .Remove': {
			visibility: 'visible',
		},
		backgroundColor: theme.palette.boardPage.blackBackgroundCard,
	}
}

/**
 * Otros estilos sueltos
 */

export const handleContainerStyles: SxProps<Theme> = {
	ml: '-15px',
	mr: '10px',
}

export const removeContainerStyles: SxProps<Theme> = {
	visibility: 'hidden',
	display: 'flex',
	mt: '-12px',
	ml: 'auto',
	mb: '-15px',
	mr: '-10px',
}

export const valueStyles: SxProps<Theme> = {
	maxWidth: '200px',
	whiteSpace: 'wrap',
	overflowWrap: 'break-word',
}
