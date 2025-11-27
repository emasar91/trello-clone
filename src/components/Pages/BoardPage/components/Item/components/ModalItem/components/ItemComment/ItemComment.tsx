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

type Props = {
	comment: ICardComment
	onEdit: () => void
	onDelete: () => void
}

const ItemComment = ({ comment, onEdit, onDelete }: Props) => {
	const theme = useTheme()

	return (
		<Box key={comment.createdAt.toString()} sx={ItemCommentContainerStyles}>
			<Box sx={ItemCommentBoxStyles}>
				<Typography sx={ItemCommentAuthorStyles}>
					{String(comment.authorName)}
				</Typography>
				<Typography sx={ItemCommentDateStyles}>
					{formatCommentDate(comment.editedAt || comment.createdAt)}
				</Typography>
			</Box>
			<Typography sx={ItemCommentCommentTextStyles(theme)}>
				{comment.text}
			</Typography>
			<Box sx={ItemCommentButtonsContainerStyles}>
				<Button sx={ItemCommentButtonStyles(theme)} onClick={onEdit}>
					Editar
				</Button>
				<Button sx={ItemCommentButtonStyles(theme)} onClick={onDelete}>
					Eliminar
				</Button>
			</Box>
		</Box>
	)
}

export default ItemComment
