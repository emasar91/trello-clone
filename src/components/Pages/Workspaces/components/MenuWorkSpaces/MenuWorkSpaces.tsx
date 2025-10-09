import { ArrowLeftIcon } from '@/public/assets/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'
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

type IMenuWorkSpaces = {
	workSpaces: IWorkspace[]
	goToWorkspaceBoards: (workspaceName: string) => void
}

function MenuWorkSpaces({ workSpaces, goToWorkspaceBoards }: IMenuWorkSpaces) {
	const theme = useTheme()
	const pathname = usePathname()
	const locale = useLocale()
	const t = useTranslations('BoardsPage')

	const [openWorkspaces, setOpenWorkspaces] = useState<Record<string, boolean>>(
		{}
	)

	const handleClick = (_id: string) => {
		setOpenWorkspaces((prev) => ({
			...prev,
			[_id]: !prev[_id], // toggle solo ese
		}))
	}

	useEffect(() => {
		const match = workSpaces.find((ws) =>
			pathname.includes(`/w/${ws.name.toLowerCase()}/boards`)
		)
		if (match) {
			setOpenWorkspaces((prev) => ({
				...prev,
				[match._id]: true,
			}))
		}
	}, [pathname, workSpaces])

	return (
		<Box sx={MenuWorkSpacesContainerListStyle}>
			{workSpaces.map((workspace) => {
				const menuActive =
					pathname === `/${locale}/w/${workspace.name.toLowerCase()}/boards`
				return (
					<Box key={workspace._id}>
						<ListItemButton
							onClick={() => handleClick(workspace._id)}
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
							{openWorkspaces[workspace._id] ? (
								<ArrowLeftIcon />
							) : (
								<ArrowRightIcon />
							)}
						</ListItemButton>

						<Collapse
							in={!!openWorkspaces[workspace._id]}
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
