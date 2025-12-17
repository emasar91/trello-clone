import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import { formatCommentDate } from '../../utils/formatCommentDate'
import { ICardComment } from '@/types/card'
import {
	ItemCommentAuthorStyles,
	ItemCommentBoxStyles,
	ItemCommentButtonsContainerStyles,
	ItemCommentButtonStyles,
	ItemCommentCommentTextStyles,
	ItemCommentContainerStyles,
	ItemCommentDateStyles,
} from './itemComment.styles'
import { useLocale, useTranslations } from 'next-intl'

type Props = {
	comment: ICardComment
	onEdit: () => void
	onDelete: () => void
}

/**
 * ItemComment es un componente que renderiza un cuadro de comentario con el nombre del autor, el texto del comentario y botones de editar y eliminar.
 * @param {IComment} comment - El comentario a renderizar.
 * @param {() => void} onEdit - Funcion de callback que se llama cuando se hace clic en el boton de editar.
 * @param {() => void} onDelete - Funcion de callback que se llama cuando se hace clic en el boton de eliminar.
 * @returns {JSX.Element} - El cuadro de comentario renderizado.
 */
const ItemComment = ({ comment, onEdit, onDelete }: Props) => {
	const theme = useTheme()
	const t = useTranslations('ModalItem')
	const locale = useLocale()

	return (
		<Box key={comment.createdAt.toString()} sx={ItemCommentContainerStyles}>
			<Box sx={ItemCommentBoxStyles}>
				<Typography sx={ItemCommentAuthorStyles}>
					{String(comment.authorName)}
				</Typography>

				<Typography sx={ItemCommentDateStyles}>
					{formatCommentDate(comment.editedAt || comment.createdAt, locale)}
				</Typography>
			</Box>
			<Typography sx={ItemCommentCommentTextStyles(theme)}>
				{comment.text}
			</Typography>

			<Box sx={ItemCommentButtonsContainerStyles}>
				<Button sx={ItemCommentButtonStyles(theme)} onClick={onEdit}>
					{t('editDescription')}
				</Button>

				<Button sx={ItemCommentButtonStyles(theme)} onClick={onDelete}>
					{t('delete')}
				</Button>
			</Box>
		</Box>
	)
}

export default ItemComment
