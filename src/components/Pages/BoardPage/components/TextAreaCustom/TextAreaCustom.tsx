import { useRef, useEffect, useState, useMemo } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import {
	ButtonContainerStyles,
	ButtonStyles,
	TextAreaCustomContainerStylesCard,
	TextAreaCustomContainerStylesColumn,
	TextAreaCustomStyles,
	TextAreaCustomStylesColumn,
} from './TextAreaCustom.styles'
import { Box, Button, useTheme } from '@mui/material'
import { CloseIcon } from '@/public/assets/icons/CloseIcon'
import { useTranslations } from 'next-intl'

interface Props {
	onCreate: (title: string) => void
	onCancel: () => void
	type: 'card' | 'column'
}

/**
 * Componente para crear un nuevo tablero o columna.
 * @param {Props} props - Propiedades del componente.
 * @param {Props.onCreate} onCreate - Función que se llama cuando se crea un nuevo tablero o columna.
 * @param {Props.onCancel} onCancel - Función que se llama cuando se cancela la creación de un nuevo tablero o columna.
 * @param {Props.type} type - Tipo de elemento que se está creando ('card' o 'column').
 */
export default function CreateCardInput({ onCreate, onCancel, type }: Props) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const [value, setValue] = useState('')
	const [cancelled, setCancelled] = useState(false)

	const cardTextAreaStyle = useMemo(() => {
		return typeof TextAreaCustomStyles === 'function'
			? TextAreaCustomStyles(theme)
			: TextAreaCustomStyles
	}, [theme])

	useEffect(() => {
		/**
		 * Función que se llama cuando se hace click fuera del contenedor de este componente.
		 * Si se está creando un tablero o columna y se hace click fuera del contenedor,
		 * se cancela la creación y se cierra el contenedor.
		 * Si se está creando un tablero, se crea el tablero con el texto escrito
		 * y se cierra el contenedor solo si no se canceló la creación con la X.
		 */
		const handleClickOutside = (e: MouseEvent) => {
			if (!wrapperRef.current) return
			const clickedOutside = !wrapperRef.current.contains(e.target as Node)
			if (!clickedOutside) return

			if (type === 'column') {
				onCancel()
				return
			}
			if (type === 'card') {
				if (!cancelled && value.trim()) {
					onCreate(value.trim())
				}
				onCancel()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [value, cancelled, type, onCreate, onCancel])

	/**
	 * Termina la creación de un nuevo tablero o columna.
	 * Si se proporciona un valor no vacío, se crea el tablero o columna con ese valor.
	 * Si se proporciona un valor vacío, se cancela la creación y se cierra el contenedor.
	 */
	const finish = () => {
		if (value.trim()) onCreate(value.trim())
		onCancel()
	}

	/**
	 * Marca cancelado para que el click fuera no cree
	 * @remarks
	 * Si se proporciona un valor no vacío, se crea el tablero o columna con ese valor.
	 * Si se proporciona un valor vacío, se cancela la creación y se cierra el contenedor.
	 */
	const handleCancel = () => {
		setCancelled(true)
		onCancel()
	}

	/**
	 * Maneja el evento de tecla presionada en un elemento de texto.
	 * Si se presiona Enter y se está en el tipo de columna, crea la columna con el valor actual.
	 * Si se presiona Enter y se está en el tipo de card, crea la tarjeta con el valor actual sin Shift.
	 * Si se presiona Enter y se está en el tipo de card con Shift, crea la tarjeta con el valor actual.
	 * Si se presiona Enter y se está en el tipo de columna con Shift, limita a 3 saltos de línea.
	 * Si se presiona Enter y se está en el tipo de card con Shift, limita a 3 saltos de línea.
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const isEnter = e.key === 'Enter'
		const isShift = e.shiftKey

		if (type === 'column') {
			if (isEnter) {
				e.preventDefault()
				finish()
			}
			return
		}

		if (type === 'card') {
			if (isEnter && !isShift) {
				e.preventDefault()
				finish()
				return
			}
			if (isEnter && isShift) {
				const lines = value.split('\n')
				if (lines.length >= 3) e.preventDefault()
			}
		}
	}

	/**
	 * Actualiza el valor del textarea.
	 * Si se canceló la creación anteriormente, se desmarca como cancelada.
	 * @param {string} v - Valor del textarea.
	 */
	const handleChange = (v: string) => {
		if (cancelled) setCancelled(false)
		setValue(v)
	}

	return (
		<Box
			ref={wrapperRef}
			sx={
				type === 'column'
					? TextAreaCustomContainerStylesColumn(theme)
					: TextAreaCustomContainerStylesCard(theme)
			}
		>
			<TextareaAutosize
				ref={textareaRef}
				autoFocus
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={type === 'column' ? t('enterNameList') : t('enterTitle')}
				maxLength={type === 'column' ? 25 : 80}
				minRows={type === 'card' ? 1 : undefined}
				maxRows={type === 'card' ? 3 : undefined}
				style={{
					...(type === 'column'
						? TextAreaCustomStylesColumn(theme)
						: (cardTextAreaStyle as React.CSSProperties)),
					outline: 'none',
					resize: 'none',
					whiteSpace: type === 'column' ? 'nowrap' : 'pre-wrap',
					overflow: 'hidden',
				}}
			/>

			<Box sx={ButtonContainerStyles}>
				<Button onClick={finish} sx={ButtonStyles(theme)}>
					{type === 'column' ? t('addColumn') : t('addCard')}
				</Button>

				<div onClick={handleCancel} style={{ cursor: 'pointer' }}>
					<CloseIcon />
				</div>
			</Box>
		</Box>
	)
}
