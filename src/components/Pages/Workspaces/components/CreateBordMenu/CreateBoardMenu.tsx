import { Box, Menu, Typography, useTheme } from '@mui/material'
import React, { memo, useState } from 'react'
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm'
import {
	CreateBoardCardCheckIconStyle,
	CreateBoardCardImageContainerStyle,
	CreateBoardCardImageStyle,
} from '../CreateBoardCard/CreateBoardCard.styles'
import { CheckIcon } from '@/public/assets/icons/CheckIcon'
import {
	CreateBoardMenuBackgroundSelectionStyles,
	CreateBoardMenuBackgroundSelectionTitleStyles,
	CreateBoardMenuContainerStyle,
	CreateBoardMenuContentStyle,
	CreateBoardMenuCreateTitleStyles,
	CreateBoardMenuItemImageStyle,
	CreateBoardMenuItemSkeletonStyle,
} from './CreateBoardMenu.styles'
import { useTranslations } from 'next-intl'
import { API } from '@/constants'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/useAuthContext'
import { useWorkSpaceStore } from '@/context/useWorkSpace'

type ICreateBoardMenuProps = {
	open: boolean
	handleClose: () => void
	anchorEl: null | HTMLElement
}

type ImageItemProps = {
	imgSrc: string
	isSelected: boolean
	onClick: () => void
}

function CreateBoardMenu({
	open,
	handleClose,
	anchorEl,
}: ICreateBoardMenuProps) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const { setWorkSpaces } = useWorkSpaceStore()

	const [backgroundSelected, setBackgroundSelected] = useState<string>(
		'/assets/fondos/fondo2.jpg'
	)

	const ImageBackgroudItem = memo(
		({ imgSrc, isSelected, onClick }: ImageItemProps) => (
			<Box
				sx={CreateBoardCardImageContainerStyle(theme, isSelected)}
				onClick={onClick}
			>
				<Box
					component="img"
					src={imgSrc}
					alt="fondo"
					loading="lazy"
					draggable={false}
					sx={CreateBoardCardImageStyle}
				/>
				{isSelected && (
					<Box sx={CreateBoardCardCheckIconStyle}>
						<CheckIcon />
					</Box>
				)}
			</Box>
		)
	)
	ImageBackgroudItem.displayName = 'ImageBackgroudItem'

	const { user } = useAuth()

	const handleCreateBoard = async ({
		boardName,
		boardDescription,
		workspaceId,
		resetForm,
		setLoading,
	}: {
		boardName: string
		boardDescription: string
		workspaceId: string
		resetForm: () => void
		setLoading: (loading: boolean) => void
	}) => {
		try {
			const { data } = await axios.post(
				API.createBoardsUrl,
				{
					name: boardName.trim(),
					description: boardDescription.trim(),
					workspaceId: workspaceId,
					image: backgroundSelected,
					lastOpenedAt: null,
				},
				{ withCredentials: true }
			)

			if (data.board) {
				resetForm()
				toast.success(t('menuBaord.successCreate'))
				const { data } = await axios.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setWorkSpaces(data)
			}
			handleClose()
			// opcional: actualizar UI con data.workspace
		} catch (err) {
			if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Menu
			id="create-board-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			disableAutoFocus={true}
			disableEnforceFocus={true}
			disableScrollLock={true}
			sx={CreateBoardMenuContainerStyle(theme)}
		>
			<Box sx={CreateBoardMenuContentStyle}>
				{/* titulo */}
				<Typography variant="h6" sx={CreateBoardMenuCreateTitleStyles(theme)}>
					{t('createNewBoardTitle')}
				</Typography>
				{/* imagen */}
				<Box
					component="img"
					loading="lazy"
					src={backgroundSelected}
					alt="Tablero"
					width={'200px'}
					height={'120px'}
					sx={CreateBoardMenuItemImageStyle}
				/>
				<Box
					component="img"
					loading="lazy"
					src={'/assets/fondos/skeleton.svg'}
					alt="Tablero"
					sx={CreateBoardMenuItemSkeletonStyle}
				/>

				<Typography
					variant="h6"
					sx={CreateBoardMenuBackgroundSelectionTitleStyles(theme)}
				>
					{t('backgroundSelection')}
				</Typography>
				<Box sx={CreateBoardMenuBackgroundSelectionStyles}>
					{Array.from({ length: 8 }).map((_, index) => {
						const imgSrc = `/assets/fondos/fondo${index + 1}.jpg`
						const isSelected = backgroundSelected === imgSrc

						return (
							<ImageBackgroudItem
								key={index}
								imgSrc={imgSrc}
								isSelected={isSelected}
								onClick={() => setBackgroundSelected(imgSrc)}
							/>
						)
					})}
				</Box>

				<CreateBoardForm onSubmit={handleCreateBoard} />
			</Box>
		</Menu>
	)
}

export default CreateBoardMenu
