import { useStoreBoard } from '@/context/useStoreBoard'
import { UniqueIdentifier } from '@dnd-kit/core'
import {
	Box,
	Button,
	Divider,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { ModalItemContainerStyles } from './ModalItem.styles'
import { DescriptionIcon } from '@/public/assets/icons/DescriptionIcon'
import { ActivityIcon } from '@/public/assets/icons/ActivityIcon'
import { CloseIcon } from '@/public/assets/icons/CloseIcon'
import { TagIcon } from '@/public/assets/icons/TagIcon'
import TagMenu from '../TagMenu/TagMenu'
import { Plus } from '@/public/assets/icons/Plus'
import { useAuth } from '@/context/useAuthContext'
import { formatCommentDate } from './utils/formatCommentDate'
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { useUpdateCardComments } from '@/hooks/useUpdateCardComments'
import { ICardComment } from '@/types/card'

type Props = {
	open: boolean
	onClose: () => void
	cardId: UniqueIdentifier
	columnId: UniqueIdentifier
	items: Items
	setItems: React.Dispatch<React.SetStateAction<Items>>
}

function ModalConfirm({
	open,
	onClose,
	cardId,
	columnId,
	items,
	setItems,
}: Props) {
	const {
		cardsByColumn,
		board: { _id: boardId },
	} = useStoreBoard()

	const theme = useTheme()

	const { user } = useAuth()

	const cardSelected = cardsByColumn[columnId].find(
		(item) => item._id === cardId
	)
	const etiquetasRef = useRef<HTMLSpanElement | null>(null)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const openMenu = Boolean(anchorEl)
	const handleClick = () => {
		setAnchorEl(etiquetasRef.current)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const [isEditingTitle, setIsEditingTitle] = useState(false)
	const [title, setTitle] = useState(cardSelected?.title || '')

	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [showEditDescription, setShowEditDescription] = useState(false)
	const [description, setDescription] = useState(
		cardSelected?.description || ''
	)

	const [showCreateComment, setShowCreateComment] = useState(false)
	const [comments, setComments] = useState<ICardComment[]>(
		cardSelected?.comments || []
	)
	const [newComment, setNewComment] = useState<string>('')

	const { updateCardComments } = useUpdateCardComments({
		items,
		setItems,
		boardId,
	})

	const handleAddComment = () => {
		if (!user) return

		const comment: ICardComment = {
			text: newComment!,
			createdAt: new Date(),
			editedAt: null,
			authorId: user.uid, // string — lo convertimos en backend
			authorName: user.displayName || 'User',
		}

		// Construir el array nuevo y enviarlo
		const newComments = [...comments, comment]

		// Llamás al hook pasando el array completo (así el backend recibe array)
		updateCardComments(cardId, newComments)

		if (comment.text.trim() !== '') {
			setComments((prev) => [...prev, comment])
			setNewComment('')
			setShowCreateComment(false)
		}
	}

	const sortedComments = [...comments].sort((a, b) => {
		const dateA: Date = new Date(a.editedAt || a.createdAt)
		const dateB: Date = new Date(b.editedAt || b.createdAt)
		return dateB.getTime() - dateA.getTime() // más nuevo primero
	})

	return (
		<Modal open={open} onClose={onClose} sx={{ p: '24px' }}>
			<Box sx={ModalItemContainerStyles(theme)}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '16px 24px',
						height: '64px',
					}}
				>
					{!isEditingTitle ? (
						<Typography
							onClick={() => setIsEditingTitle(true)}
							variant="h6"
							sx={{
								fontSize: '20px',
								lineHeight: '32px',
								fontWeight: 'bold',
								color: theme.palette.modal.textColor,
							}}
						>
							{title.charAt(0).toUpperCase() + title.slice(1)}
						</Typography>
					) : (
						<TextField
							autoFocus
							fullWidth
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							onBlur={() => setIsEditingTitle(false)}
							sx={{
								maxWidth: '50%',
								input: {
									fontSize: '20px',
									lineHeight: '32px',
									fontWeight: 'bold',
									color: theme.palette.modal.textColor,
									padding: '4px 8px',
								},
							}}
						/>
					)}
					<Box
						onClick={onClose}
						sx={{ cursor: 'pointer', color: theme.palette.modal.textColor }}
					>
						<CloseIcon />
					</Box>
				</Box>

				<Divider />
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							bgcolor: theme.palette.modal.backgroundColor,
							flexDirection: 'column',
							justifyContent: 'start',
							gap: '16px',
							width: '100%',
							padding: '24px',
							marginTop: '16px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'start',
								justifyContent: 'start',
								width: '100%',
								gap: '8px',
								color: theme.palette.modal.textColor,
								flexDirection: 'column',
							}}
						>
							<Box
								ref={etiquetasRef}
								sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
							>
								<TagIcon />
								<Typography
									sx={{
										fontWeight: 'bold',
										lineHeight: '20px',
										fontSize: '14px',
										color: theme.palette.modal.textColor,
									}}
								>
									Etiquetas
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', gap: '8px' }}>
								{selectedTags.map((tag) => (
									<Box
										key={tag}
										sx={{
											backgroundColor: tag,
											borderRadius: '4px',
											height: '32px',
											width: '48px',
											color: theme.palette.modal.textColor,
										}}
									/>
								))}
								<Button
									onClick={handleClick}
									sx={{
										bgcolor: '#303134',
										width: '32px',
										height: '32px',
										minWidth: '32px',
										padding: '0',
										margin: '0',
										overflow: 'hidden',
										boxSizing: 'border-box',
										color: theme.palette.modal.textColor,
										'&:hover': {
											filter: 'brightness(1.2)',
										},
									}}
								>
									<Plus />
								</Button>
							</Box>
							<TagMenu
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
								open={openMenu}
								handleClose={handleClose}
								anchorEl={anchorEl}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'start',
								width: '100%',
								gap: '8px',
								color: theme.palette.modal.textColor,
								flexDirection: 'column',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '8px',
									width: '100%',
									justifyContent: 'space-between',
								}}
							>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									<DescriptionIcon />
									<Typography
										sx={{
											fontWeight: 'bold',
											lineHeight: '20px',
											fontSize: '14px',
											color: theme.palette.modal.textColor,
										}}
									>
										Descripción
									</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									{description !== cardSelected?.description && (
										<Typography
											sx={{
												color: theme.palette.modal.textColor,
												fontWeight: 'bold',
												fontSize: '11px',
												lineHeight: '16px',
												border: '1px solid #fca700',
												borderRadius: '4px',
												padding: '0 2px',
											}}
										>
											CAMBIOS SIN GUARDAR
										</Typography>
									)}

									<Button
										onClick={() => setShowEditDescription(true)}
										sx={{
											bgcolor: '#303134',
											color: theme.palette.modal.textColor,
											'&:hover': {
												filter: 'brightness(1.2)',
											},
										}}
									>
										Editar
									</Button>
								</Box>
							</Box>

							{showEditDescription ? (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
										width: '100%',
										gap: '8px',
										flexDirection: 'column',
									}}
								>
									<TextField
										value={description}
										autoFocus
										onChange={(e) => {
											const text = e.target.value
											const lines = text.split('\n')

											if (lines.length <= 4) {
												setDescription(text)
											}
										}}
										multiline
										rows={4}
										variant="outlined"
										fullWidth
										maxRows={4}
										sx={{
											borderColor: 'red',
											'& .MuiInputBase-input': {
												color: theme.palette.modal.textColor,
												borderColor: 'red',
											},
											'& .MuiInputBase-root': {
												borderColor: 'red',
											},
										}}
									/>
									<Box
										sx={{
											display: 'flex',
											gap: '8px',
											justifyContent: 'start',
											alignItems: 'center',
											width: '100%',
										}}
									>
										<Button variant="contained">Guardar</Button>
										<Button
											sx={{
												color: theme.palette.modal.textColor,
												'&:hover': {
													bgcolor: '#303134',
													filter: 'brightness(1.2)',
												},
											}}
											onClick={() => {
												setDescription(cardSelected?.description)
												setShowEditDescription(false)
											}}
										>
											{description !== cardSelected?.description
												? 'Descartar cambios'
												: 'Cancelar'}
										</Button>
									</Box>
								</Box>
							) : (
								<Typography>{cardSelected?.description}</Typography>
							)}
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'start',
							justifyContent: 'start',
							bgcolor: '#18191a',
							width: '100%',
							padding: '24px',
							paddingTop: '40px',
							flexDirection: 'column',
							gap: '14px',
							maxHeight: '50vh',
							overflowY: 'auto',
							scrollbarWidth: 'thin',
							scrollbarColor: '#6e6f68 #101204',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								width: '100%',
								color: theme.palette.modal.textColor,
							}}
						>
							<ActivityIcon />
							<Typography
								sx={{
									fontWeight: 'bold',
									lineHeight: '20px',
									fontSize: '14px',
									color: theme.palette.modal.textColor,
								}}
							>
								Comentarios y Actividad
							</Typography>
							{newComment !== '' && (
								<Typography
									sx={{
										color: theme.palette.modal.textColor,
										fontWeight: 'bold',
										fontSize: '11px',
										lineHeight: '16px',
										border: '1px solid #fca700',
										borderRadius: '4px',
										padding: '0 2px',
									}}
								>
									CAMBIOS SIN GUARDAR
								</Typography>
							)}
						</Box>
						<Box sx={{ width: '100%' }}>
							{!showCreateComment ? (
								<Button
									variant="contained"
									fullWidth
									disableElevation
									disableRipple
									onClick={() => setShowCreateComment(true)}
									sx={{
										color: theme.palette.modal.textColor,
										fontWeight: 'bold',
										bgcolor: '#242528',
										padding: '6px 12px',
										textAlign: 'start',
										borderRadius: '8px',
										boxShadow: 0,
										justifyContent: 'flex-start', // ⭐ CLAVE
										':hover': {
											bgcolor: '#303134',
											filter: 'brightness(1.2)',
											boxShadow: 0,
										},
									}}
								>
									Escribe un comentario...
								</Button>
							) : (
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: '8px',
									}}
								>
									<TextField
										multiline
										autoFocus
										rows={4}
										variant="outlined"
										fullWidth
										maxRows={4}
										value={newComment}
										onChange={(e) => {
											const text = e.target.value
											const lines = text.split('\n')

											if (lines.length <= 4) {
												setNewComment(e.target.value)
											}
										}}
										sx={{
											borderColor: 'red',
											'& .MuiInputBase-input': {
												color: theme.palette.modal.textColor,
												borderColor: 'red',
											},
											'& .MuiInputBase-root': {
												borderColor: 'red',
											},
										}}
									/>
									<Box
										sx={{
											display: 'flex',
											gap: '8px',
											justifyContent: 'start',
											alignItems: 'center',
											width: '100%',
										}}
									>
										<Button variant="contained" onClick={handleAddComment}>
											Guardar
										</Button>
										<Button
											sx={{
												color: theme.palette.modal.textColor,
												'&:hover': {
													bgcolor: '#303134',
													filter: 'brightness(1.2)',
												},
											}}
											onClick={() => {
												setShowCreateComment(false)
											}}
										>
											Cancelar
										</Button>
									</Box>
								</Box>
							)}

							{sortedComments.map((comment) => (
								<Box
									key={comment.createdAt.toString()}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: '8px',
										width: '100%',
										marginTop: '8px',
									}}
								>
									<Box
										sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
									>
										<Typography
											sx={{
												color: theme.palette.modal.textColor,
												fontSize: '14px',
												lineHeight: '20px',
											}}
										>
											{String(comment.authorName)}
										</Typography>
										<Typography
											sx={{
												color: '#669df1',
												fontSize: '12px',
												lineHeight: '20px',
											}}
										>
											{formatCommentDate(comment.createdAt)}
										</Typography>
									</Box>
									<Typography
										sx={{
											color: theme.palette.modal.textColor,
											fontSize: '14px',
											lineHeight: '20px',
											bgcolor: '#242528',
											borderRadius: '8px',
											width: '100%',
											padding: '6px 12px',
											wordBreak: 'break-word',
										}}
									>
										{comment.text}
									</Typography>
								</Box>
							))}
						</Box>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalConfirm
