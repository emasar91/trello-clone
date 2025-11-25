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
import { ModalItemContainerStyles } from './ModalItem.styles'
import { DescriptionIcon } from '@/public/assets/icons/DescriptionIcon'
import { ActivityIcon } from '@/public/assets/icons/ActivityIcon'
import { CloseIcon } from '@/public/assets/icons/CloseIcon'
import { TagIcon } from '@/public/assets/icons/TagIcon'
import TagMenu from '../TagMenu/TagMenu'
import { Plus } from '@/public/assets/icons/Plus'

type Props = {
	open: boolean
	onClose: () => void
	cardId: UniqueIdentifier
	columnId: UniqueIdentifier
}

function ModalConfirm({ open, onClose, cardId, columnId }: Props) {
	const { cardsByColumn } = useStoreBoard()
	const theme = useTheme()

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

	const [selectedTags, setSelectedTags] = useState<string[]>([])

	return (
		<Modal open={open} onClose={onClose} sx={{ p: '24px' }}>
			<Box sx={ModalItemContainerStyles(theme)}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 'bold',
							marginBottom: '16px',
							color: theme.palette.modal.textColor,
						}}
					>
						{cardSelected?.title.charAt(0).toUpperCase() +
							cardSelected?.title.slice(1)}
					</Typography>
					<Box
						onClick={onClose}
						sx={{ cursor: 'pointer', color: theme.palette.modal.textColor }}
					>
						<CloseIcon />
					</Box>
				</Box>

				<Divider sx={{ marginBottom: '16px' }} />
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							bgcolor: 'blue',
							padding: '10px',
							flexDirection: 'column',
							justifyContent: 'start',
							gap: '16px',
							width: '100%',
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
							}}
						>
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
							<Typography>{cardSelected?.description}</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							bgcolor: 'red',
							width: '100%',
							padding: '10px',
						}}
					>
						<ActivityIcon />
						<Typography>Actividad</Typography>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalConfirm
