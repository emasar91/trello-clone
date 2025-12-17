import { Box, Popover, Typography, useTheme } from '@mui/material'
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
import { useAuth } from '@/context/useAuthContext'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useCreateBoard } from '@/hooks/useCreateBoard'

type ICreateBoardMenuProps = {
	open: boolean
	handleClose: () => void
	anchorEl: null | HTMLElement
	workspaceName?: string
}

type ImageItemProps = {
	imgSrc: string
	isSelected: boolean
	onClick: () => void
}

/**
 * Componente para criar um novo tablero em um workspace.
 *
 * @param {open} Indica se o menu est  aberto.
 * @param {handleClose} Fun o para fechar o menu.
 * @param {anchorEl} Elemento HTML que serve como ancora para o menu.
 * @param {workspaceName} Nome do workspace no qual o tablero ser  criado.
 *
 * @returns Um componente que renderiza um menu de cria o de tablero.
 */
function CreateBoardMenu({
	open,
	handleClose,
	anchorEl,
	workspaceName,
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
	const { handleCreateBoard, loading } = useCreateBoard({
		setWorkSpaces,
		user,
		backgroundSelected,
	})

	return (
		<Popover
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
			disableAutoFocus
			disableEnforceFocus
			disableRestoreFocus
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

				<CreateBoardForm
					onSubmit={handleCreateBoard}
					workspaceName={workspaceName}
					loading={loading}
					handleClose={handleClose}
				/>
			</Box>
		</Popover>
	)
}

export default CreateBoardMenu
