import { TrelloLogoIcon } from '@/public/assets/icons/TrelloLogoIcon'
import {
	Box,
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	useTheme,
} from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
	MenuWorkSpacesContainerItemCollapsableStyle,
	MenuWorkSpacesContainerListStyle,
	MenuWorkSpacesIconContainerStyle,
	MenuWorkSpacesItemContainerStyle,
	MenuWorkSpacesItemTextStyle,
	MenuWorkSpacesListItemCollapsableStyle,
	MenuWorkSpacesListItemStyle,
	MenuWorkSpacesTextItemCollapsableStyle,
} from './MenuWorkSpaces.tyles'
import { IWorkspace } from '@/types/workspaces'
import { ArrowDownIcon } from '@/public/assets/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@/public/assets/icons/ArrowUpIcon'

type IMenuWorkSpaces = {
	workSpaces: IWorkspace[]
	goToWorkspaceBoards: (workspaceName: string) => void
}

/**
 * MenuWorkSpaces es un componente que renderiza una lista de workspaces en el menu.
 * Cada workspace es collapsible y cuando se abre, muestra un boton para ir a los tableros de ese workspace.
 * El componente tambien maneja el estado activo del menu, para que el workspace seleccionado actualmente se destaque.
 * @param {IWorkspace[]} workspaces - Lista de workspaces a mostrar.
 * @param {Function} goToWorkspaceBoards - Funcion para llamar cuando un workspace es seleccionado.
 */
function MenuWorkSpaces({ workSpaces, goToWorkspaceBoards }: IMenuWorkSpaces) {
	const theme = useTheme()
	const pathname = usePathname()
	const locale = useLocale()
	const t = useTranslations('BoardsPage')

	const [openWorkspaces, setOpenWorkspaces] = useState<Record<string, boolean>>(
		{}
	)

	/**
	 * handleClick es una funcion que maneja el evento de click en un item de workspace en el menu.
	 * Cambia el estado abierto del workspace en el openWorkspaces state.
	 * @param {_id} - El id del item de workspace a cambiar.
	 */
	const handleClick = (_id: string) => {
		setOpenWorkspaces((prev) => ({
			...prev,
			[_id]: !prev[_id],
		}))
	}

	useEffect(() => {
		const match = workSpaces.find((ws) =>
			pathname.includes(`/w/${ws.name.toLowerCase()}/boards`)
		)
		if (match) {
			setOpenWorkspaces((prev) => ({
				...prev,
				[match._id.toString()]: true,
			}))
		}
	}, [pathname, workSpaces])

	return (
		<Box sx={MenuWorkSpacesContainerListStyle}>
			{workSpaces.map((workspace) => {
				const menuActive =
					pathname === `/${locale}/w/${workspace.name.toLowerCase()}/boards`
				return (
					<Box key={workspace._id.toString()}>
						<ListItemButton
							onClick={() => handleClick(workspace._id.toString())}
							sx={MenuWorkSpacesListItemStyle}
						>
							<Box sx={MenuWorkSpacesItemContainerStyle}>
								<Box
									sx={MenuWorkSpacesIconContainerStyle(workspace.avatarColor)}
								>
									{workspace.name.charAt(0).toUpperCase()}
								</Box>
								<ListItemText
									primary={workspace.name}
									sx={MenuWorkSpacesItemTextStyle(theme)}
								/>
							</Box>
							{openWorkspaces[workspace._id.toString()] ? (
								<Box marginRight={1}>
									<ArrowUpIcon />
								</Box>
							) : (
								<Box marginRight={1}>
									<ArrowDownIcon />
								</Box>
							)}
						</ListItemButton>

						<Collapse
							in={!!openWorkspaces[workspace._id.toString()]}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItemButton
									sx={MenuWorkSpacesListItemCollapsableStyle(menuActive, theme)}
									onClick={() => goToWorkspaceBoards(workspace.name)}
								>
									<Box sx={MenuWorkSpacesContainerItemCollapsableStyle}>
										<TrelloLogoIcon
											color={theme.palette.boardsMenu.textBoards}
										/>
										<ListItemText
											primary={t('boards')}
											sx={MenuWorkSpacesTextItemCollapsableStyle(
												menuActive,
												theme
											)}
										/>
									</Box>
								</ListItemButton>
							</List>
						</Collapse>
					</Box>
				)
			})}
		</Box>
	)
}

export default MenuWorkSpaces
