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

export default function CreateCardInput({ onCreate, onCancel, type }: Props) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const [value, setValue] = useState('')
	const [cancelled, setCancelled] = useState(false) // evita creación cuando se pulsa X

	// ---------- Compatibilidad estilos: TextAreaCustomStyles puede ser función (theme) o objeto ----------
	const cardTextAreaStyle = useMemo(() => {
		return typeof TextAreaCustomStyles === 'function'
			? TextAreaCustomStyles(theme)
			: TextAreaCustomStyles
	}, [theme])

	// ---------- click fuera del contenedor ----------
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!wrapperRef.current) return
			const clickedOutside = !wrapperRef.current.contains(e.target as Node)
			if (!clickedOutside) return

			// Column: siempre cancelar (solo crear con botón/Enter)
			if (type === 'column') {
				onCancel()
				return
			}

			// Card: crear sólo si hay texto y no fue cancelado por la X
			// y luego cerrar
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

	// ---------- finish (botón / Enter) ----------
	const finish = () => {
		if (value.trim()) onCreate(value.trim())
		onCancel()
	}

	// ---------- cancelar via X ----------
	const handleCancel = () => {
		// marcar cancelado para que el click fuera no cree
		setCancelled(true)
		onCancel()
	}

	// ---------- teclado ----------
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const isEnter = e.key === 'Enter'
		const isShift = e.shiftKey

		if (type === 'column') {
			// Column: Enter crea (sin shift)
			if (isEnter) {
				e.preventDefault()
				finish()
			}
			return
		}

		if (type === 'card') {
			// Card: Enter sin Shift crea
			if (isEnter && !isShift) {
				e.preventDefault()
				finish()
				return
			}
			// limitar saltos de línea
			if (isEnter && isShift) {
				const lines = value.split('\n')
				if (lines.length >= 3) e.preventDefault()
			}
		}
	}

	// Resetear cancelled cuando el usuario vuelve a escribir (permite crear otra vez)
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
