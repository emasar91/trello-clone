import { useRef, useEffect, useState, CSSProperties } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import {
	TextAreaCustomStyles,
	TextAreaCustomStylesColumn,
} from './TextAreaCustom.styles'
import { useTheme } from '@mui/material'

interface Props {
	onCreate: (title: string) => void
	onCancel: () => void
	type: 'card' | 'column'
}

export default function CreateCardInput({ onCreate, onCancel, type }: Props) {
	const theme = useTheme()
	const ref = useRef<HTMLTextAreaElement>(null)
	const [value, setValue] = useState('')

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				ref.current.blur()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const finish = () => {
		if (value.trim()) onCreate(value.trim())
		onCancel()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const isEnter = e.key === 'Enter'
		const isShift = e.shiftKey

		/** ------------------------------
		 * COLUMN MODE
		 * ------------------------------ */
		if (type === 'column') {
			// Shift+Enter NO permitido (evita salto de línea)
			if (isEnter && isShift) {
				e.preventDefault()
				return
			}

			// Enter → crea columna
			if (isEnter && !isShift) {
				e.preventDefault()
				finish()
				return
			}

			// No permitir salto de línea jamás
			if (e.key === 'Enter') {
				e.preventDefault()
				return
			}

			return
		}

		/** ------------------------------
		 * CARD MODE
		 * ------------------------------ */
		if (type === 'card') {
			if (isEnter && !isShift) {
				e.preventDefault()
				finish()
				return
			}

			if (isEnter && isShift) {
				const lines = value.split('\n')
				if (lines.length >= 3) {
					e.preventDefault()
				}
			}
		}
	}

	return (
		<TextareaAutosize
			ref={ref}
			autoFocus
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onBlur={finish}
			onKeyDown={handleKeyDown}
			placeholder="Introduce un título"
			maxLength={type === 'column' ? 25 : 80}
			minRows={1}
			maxRows={type === 'card' ? 3 : 1}
			style={
				type === 'card'
					? TextAreaCustomStyles
					: ({
							...TextAreaCustomStylesColumn(theme),
							whiteSpace: 'nowrap', // 1 sola línea
							overflow: 'hidden', // corta al final del ancho
							resize: 'none',
					  } as CSSProperties)
			}
		/>
	)
}
