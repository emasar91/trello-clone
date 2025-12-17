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
 * ItemComment component renders a comment box with author name, comment text and edit and delete buttons.
 *
 * @param {IComment} comment - The comment to be rendered.
 * @param {() => void} onEdit - Callback function to be called when the edit button is clicked.
 * @param {() => void} onDelete - Callback function to be called when the delete button is clicked.
 * @returns {JSX.Element} - The rendered comment box.
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
