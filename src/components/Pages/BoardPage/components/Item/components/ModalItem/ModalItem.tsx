import { useStoreBoard } from '@/context/useStoreBoard'
import { UniqueIdentifier } from '@dnd-kit/core'
import {
	Box,
	Button,
	Divider,
	Modal,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import {
	ModalItemActivityContainerStyles,
	ModalItemActivityContentContainerStyles,
	ModalItemActivityTitleContainerStyles,
	ModalItemActivityTypographyStyles,
	ModalItemContainerStyles,
	ModalItemCreateCommentButtonStyles,
	ModalItemDescriptionContainerStyles,
	ModalItemDescriptionContentContainerStyles,
	ModalItemDescriptionTextStyles,
	ModalItemDescriptionTitleContainerStyles,
	ModalItemDescriptionTitleStyles,
	ModalItemDescriptionTypographyRightStyles,
	ModalItemDescriptionTypographyStyles,
	ModalItemEditDescriptionButtonStyles,
	ModalItemTagButtonStyles,
	ModalItemTagContentContainerStyles,
	ModalItemTagItemStyles,
	ModalItemTagsContainerStyles,
	ModalItemTagTitleStyles,
	ModalItemUnsavedChangesStyles,
} from './ModalItem.styles'
import { DescriptionIcon } from '@/public/assets/icons/DescriptionIcon'
import { ActivityIcon } from '@/public/assets/icons/ActivityIcon'
import { TagIcon } from '@/public/assets/icons/TagIcon'
import TagMenu from '../TagMenu/TagMenu'
import { Plus } from '@/public/assets/icons/Plus'
import { useAuth } from '@/context/useAuthContext'
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { useUpdateCardComments } from '@/hooks/useUpdateCardComments'
import { ICardComment } from '@/types/card'
import CreateEditComment from './components/CreateEditComment/CreateEditComment'
import EditDescription from './components/EditDescription/EditDescription'
import ItemComment from './components/ItemComment/ItemComment'
import Header from './components/Header/Header'
import { useUpdateCardPriority } from '@/hooks/useUptadeCardTags'
import { useUpdateCardTitle } from '@/hooks/useUpdateCardTitle'
import { useUpdateCardDescription } from '@/hooks/useUpdateCardDescription'
import { useTranslations } from 'next-intl'
type Props = {
	open: boolean
	onClose: () => void
	cardId: UniqueIdentifier
	columnId: UniqueIdentifier
	items: Items
	setItems: React.Dispatch<React.SetStateAction<Items>>
}

/**
 * Modal Item component. Handles the modal for a specific item in a board.
 *
 * @param {object} props - Props for the ModalItem component.
 * @param {boolean} props.open - Whether the modal is open or not.
 * @param {function} props.onClose - Function to close the modal.
 * @param {string} props.cardId - The id of the card.
 * @param {string} props.columnId - The id of the column.
 * @param {Items} props.items - Items of the board.
 * @param {function} props.setItems - Function to set the items of the board.
 */
const ModalItem = ({
	open,
	onClose,
	cardId,
	columnId,
	items,
	setItems,
}: Props) => {
	const {
		board: { _id: boardId },
	} = useStoreBoard()

	const t = useTranslations('ModalItem')

	const theme = useTheme()

	const { user } = useAuth()

	const cardSelected = items[columnId]?.items.find(
		(item) => item._id.toString() === cardId
	)

	const etiquetasRef = useRef<HTMLSpanElement | null>(null)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const openMenu = Boolean(anchorEl)

	/**
	 * Sets the anchor element to the current target element, which is the
	 * element that was clicked.
	 * This is used to open the menu when the card is clicked.
	 */
	const handleClick = () => {
		setAnchorEl(etiquetasRef.current)
	}

	/**
	 * Closes the menu by setting the anchor element to null.
	 */
	const handleClose = () => {
		setAnchorEl(null)
	}

	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [title, setTitle] = useState(cardSelected?.title || '')

	const [selectedTags, setSelectedTags] = useState<string[]>(
		cardSelected?.priorityColor || []
	)
	const [showEditDescription, setShowEditDescription] = useState(false)
	const [description, setDescription] = useState<string>(
		cardSelected?.description || ''
	)

	const [showCreateComment, setShowCreateComment] = useState(false)
	const [showEditComment, setShowEditComment] = useState<{
		show: boolean
		id: string
		createdAt: Date | string
	}>({
		show: false,
		id: '',
		createdAt: '',
	})

	const [editComment, setEditComment] = useState('')

	const [comments, setComments] = useState<ICardComment[]>(
		cardSelected?.comments || []
	)
	const [newComment, setNewComment] = useState<string>('')

	const { updateCardComments } = useUpdateCardComments({
		items,
		setItems,
		boardId,
	})

	const { updateCardPriority } = useUpdateCardPriority({
		items,
		setItems,
		boardId,
	})

	const { updateCardTitle } = useUpdateCardTitle({
		items,
		setItems,
		boardId,
	})

	const { updateCardDescription } = useUpdateCardDescription({
		items,
		setItems,
		boardId,
	})

	/**
	 * Agrega un comentario a una tarjeta.
	 * @param {string} type - Tipo de comentario ('new' o 'edit').
	 * @returns {void}
	 */
	const handleAddComment = (type: 'new' | 'edit') => {
		if (!user) return
		const id = type === 'new' ? crypto.randomUUID() : showEditComment.id
		//1️⃣ Si es nuevo, se genera un id nuevo, si es edición, se usa el id de la edición
		const comment: ICardComment = {
			_id: id,
			text: type === 'new' ? newComment! : editComment,
			createdAt:
				type === 'new'
					? new Date()
					: new Date(showEditComment?.createdAt || new Date()),
			editedAt: type === 'edit' ? new Date() : null,
			authorId: user.uid, // string — lo convertimos en backend
			authorName: user.displayName || 'User',
		}
		// 2️⃣ Construir el array nuevo y enviarlo
		const newComments =
			type === 'new'
				? [...comments, comment]
				: comments.map((c) => (c._id === id ? comment : c))

		// 3️⃣ Llamás al hook pasando el array completo (así el backend recibe array)
		updateCardComments(cardId, newComments, type)

		// 4️⃣ Si el comentario no está vacío, se actualiza el estado local
		if (comment.text.trim() !== '') {
			setComments((prev) =>
				type === 'new'
					? [...prev, comment]
					: comments.map((c) => (c._id === id ? comment : c))
			)
			if (type === 'new') {
				setNewComment('')
				setShowCreateComment(false)
			} else {
				setEditComment('')
				setShowEditComment({ show: false, id: '', createdAt: '' })
			}
		}
	}

	// 5️⃣ Ordena los comentarios por fecha de edición o creación
	const sortedComments = [...comments].sort((a, b) => {
		const dateA: Date = new Date(a.editedAt || a.createdAt)
		const dateB: Date = new Date(b.editedAt || b.createdAt)
		return dateB.getTime() - dateA.getTime() // más nuevo primero
	})

	/**
	 * Elimina un comentario de una tarjeta.
	 * @param {ICardComment} comment - Comentario a eliminar.
	 * @returns {void}
	 */
	const handleDeleteComment = (comment: ICardComment) => {
		const newComments = comments.filter((c) => c !== comment)
		updateCardComments(cardId, newComments, 'delete')
		setComments(newComments)
	}

	/**
	 * Edita el título de una tarjeta.
	 * Si el título es vacío, no hace nada.
	 * De lo contrario, llama al updateCardTitle para actualizar el título en el servidor
	 * y actualiza el estado local.
	 */
	const handleEditTitle = () => {
		if (title.trim() === '') {
			return
		}
		updateCardTitle(cardId, title)
		setIsEditingTitle(false)
		setTitle(cardSelected?.title || '')
	}

	/**
	 * Edita la descripci n de una tarjeta.
	 * Si la descripci n es vac a, no hace nada.
	 * De lo contrario, llama a updateCardDescription para actualizar la descripci n en el servidor
	 * y actualiza el estado local.
	 */
	const handleEditDescription = () => {
		if (description.trim() === '') {
			return
		}
		updateCardDescription(cardId, description)
		setShowEditDescription(false)
	}

	return (
		<Modal open={open} onClose={onClose} sx={{ p: '24px' }}>
			<Box sx={ModalItemContainerStyles(theme)}>
				<Header
					isEditingTitle={isEditingTitle}
					setIsEditingTitle={setIsEditingTitle}
					title={title}
					setTitle={setTitle}
					onClose={onClose}
					onSubmit={handleEditTitle}
				/>
				<Divider />
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					sx={{
						'@media (max-width: 900px)': {
							flexDirection: 'column',
						},
					}}
				>
					<Box sx={ModalItemDescriptionContainerStyles(theme)}>
						<Box sx={ModalItemTagContentContainerStyles(theme)}>
							<Box ref={etiquetasRef} sx={ModalItemDescriptionTypographyStyles}>
								<TagIcon />
								<Typography sx={ModalItemTagTitleStyles(theme)}>
									{t('tags')}
								</Typography>
							</Box>
							<Box sx={ModalItemTagsContainerStyles}>
								{selectedTags.map((tag) => (
									<Box key={tag} sx={ModalItemTagItemStyles(theme, tag)} />
								))}
								<Button
									onClick={handleClick}
									sx={ModalItemTagButtonStyles(theme)}
								>
									<Plus />
								</Button>
							</Box>
							<TagMenu
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
								onSubmit={updateCardPriority}
								open={openMenu}
								cardId={cardId}
								handleClose={handleClose}
								anchorEl={anchorEl}
							/>
						</Box>
						<Box sx={ModalItemDescriptionContentContainerStyles(theme)}>
							<Box sx={ModalItemDescriptionTitleContainerStyles}>
								<Box sx={ModalItemDescriptionTypographyStyles}>
									<DescriptionIcon />
									<Typography sx={ModalItemDescriptionTitleStyles(theme)}>
										{t('description')}
									</Typography>
								</Box>
								<Box sx={ModalItemDescriptionTypographyRightStyles}>
									{description !== cardSelected?.description && (
										<Typography sx={ModalItemUnsavedChangesStyles(theme)}>
											{t('unsavedChanges')}
										</Typography>
									)}

									<Button
										onClick={() => setShowEditDescription(true)}
										sx={ModalItemEditDescriptionButtonStyles(theme)}
									>
										{t('editDescription')}
									</Button>
								</Box>
							</Box>

							{showEditDescription ? (
								<EditDescription
									description={description}
									setDescription={setDescription}
									setShowEditDescription={setShowEditDescription}
									cardSelected={cardSelected}
									onSubmit={handleEditDescription}
								/>
							) : (
								cardSelected?.description && (
									<Typography sx={ModalItemDescriptionTextStyles(theme)}>
										{cardSelected?.description}
									</Typography>
								)
							)}
						</Box>
					</Box>
					<Box sx={ModalItemActivityContainerStyles(theme)}>
						<Box sx={ModalItemActivityTitleContainerStyles(theme)}>
							<ActivityIcon />
							<Typography sx={ModalItemActivityTypographyStyles(theme)}>
								{t('commentsAndActivity')}
							</Typography>
							{newComment !== '' && (
								<Typography sx={ModalItemUnsavedChangesStyles(theme)}>
									{t('unsavedChanges')}
								</Typography>
							)}
						</Box>
						<Box sx={ModalItemActivityContentContainerStyles}>
							{!showCreateComment ? (
								<Button
									variant="contained"
									fullWidth
									disableElevation
									disableRipple
									onClick={() => setShowCreateComment(true)}
									sx={ModalItemCreateCommentButtonStyles(theme)}
								>
									{t('writeComment')}
								</Button>
							) : (
								<CreateEditComment
									value={newComment}
									type="new"
									setvalue={setNewComment}
									onSubmit={() => handleAddComment('new')}
									setShow={setShowCreateComment}
								/>
							)}

							{sortedComments.map((comment) => {
								return showEditComment.id === comment._id ? (
									<CreateEditComment
										key={comment._id}
										type="edit"
										value={editComment}
										setvalue={setEditComment}
										onSubmit={() => handleAddComment('edit')}
										setShow={() =>
											setShowEditComment({
												show: false,
												id: '',
												createdAt: '',
											})
										}
									/>
								) : (
									<ItemComment
										key={comment._id}
										comment={comment}
										onEdit={() =>
											setShowEditComment({
												id: comment._id,
												show: true,
												createdAt: comment.createdAt,
											})
										}
										onDelete={() => handleDeleteComment(comment)}
									/>
								)
							})}
						</Box>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalItem
