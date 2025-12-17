import { Box, Button, TextField, useTheme } from '@mui/material'
import React from 'react'
import {
	CreateEditCommentButtonCancelStyles,
	CreateEditCommentButtonSaveStyles,
	CreateEditCommentButtonsContainerStyles,
	CreateEditCommentContainerStyles,
	CreateEditCommentInputStyles,
} from './CreateEditComment.styles'
import { useTranslations } from 'next-intl'

type Props = {
	value: string
	setvalue: React.Dispatch<React.SetStateAction<string>>
	onSubmit: () => void
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	type: 'new' | 'edit'
}

/**
 * CreateEditComment es un componente que permite crear o editar un comentario en una tarjeta.
 * @param {string} value - Valor del comentario.
 * @param {React.Dispatch<React.SetStateAction<string>>} setValue - Funcion para editar el valor del comentario.
 * @param {() => void} onSubmit - Funcion para enviar el formulario y cerrar el modal.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setShow - Funcion para mostrar o esconder el formulario de edici n del comentario.
 * @param {'new' | 'edit'} type - Tipo de formulario, 'new' para crear un nuevo comentario o 'edit' para editar un comentario existente.
 * @returns {JSX.Element} Componente para crear o editar un comentario en una tarjeta.
 */
const CreateEditComment = ({
	value,
	setvalue,
	onSubmit,
	setShow,
	type = 'new',
}: Props) => {
	const theme = useTheme()
	const t = useTranslations('ModalItem')

	return (
		<Box sx={CreateEditCommentContainerStyles(type)}>
			<TextField
				multiline
				autoFocus
				rows={3}
				variant="outlined"
				fullWidth
				maxRows={3}
				value={value}
				onChange={(e) => {
					const text = e.target.value
					const lines = text.split('\n')

					if (lines.length <= 3) {
						setvalue(e.target.value)
					}
				}}
				sx={CreateEditCommentInputStyles(theme)}
			/>
			<Box sx={CreateEditCommentButtonsContainerStyles}>
				<Button
					variant="contained"
					onClick={onSubmit}
					sx={CreateEditCommentButtonSaveStyles(theme)}
				>
					{type === 'new' ? t('save') : t('update')}
				</Button>

				<Button
					sx={CreateEditCommentButtonCancelStyles(theme)}
					onClick={() => {
						setShow(false)
					}}
				>
					{t('cancel')}
				</Button>
			</Box>
		</Box>
	)
}

export default CreateEditComment
