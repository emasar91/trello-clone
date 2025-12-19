import { LogoIcon } from '@/public/assets/icons/LogoIcon'
import { SearchIcon } from '@/public/assets/icons/SearchIcon'
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Input,
	InputAdornment,
	Link,
	useTheme,
} from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AccountMenu from './components/AccountMenu/AccountMenu'
import {
	NavbarLoggedActionsStyle,
	NavbarLoggedAdormentIconStyle,
	NavbarLoggedContainerStyle,
	NavbarLoggedCreateButtonStyle,
	NavbarLoggedInnerWrapperStyle,
	NavbarLoggedLogoWrapperStyle,
	NavbarLoggedSearchBoxContainerStyle,
	NavbarLoggedSearchContainerStyle,
	NavbarLoggedSearchInputStyle,
	NavbarLoggedSearchLoadingStyle,
	NavbarLoggedSearchSectionStyle,
	NavbarLoggedSearchWrapperStyle,
} from './NavBarLogged.styles'
import { useTranslations } from 'next-intl'
import CreateBoardMenu from '../Pages/Workspaces/components/CreateBordMenu/CreateBoardMenu'
import { useSearchCards } from '@/hooks/useSearchCard'
import SearchBox from './components/SearchBox/SearchBox'
import { usePathname, useRouter } from 'next/navigation'
import { useStoreBoard } from '@/context/useStoreBoard'
import { AccountMenuNavbarAvatarStyle } from './components/AccountMenu/AccountMenu.styles'
import { useAuth } from '@/context/useAuthContext'
import { UserDefaultIcon } from '@/public/assets/icons/UserDefaultIcon'

/**
 * NavbarLogged component
 *
 * @returns {JSX.Element} NavbarLogged component
 */
const NavbarLogged = () => {
	const t = useTranslations('NavbarLogged')
	const theme = useTheme()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)

	const {
		searchValue,
		setSearchValue,
		results,
		loading,
		hasSearched,
		isTyping,
	} = useSearchCards()

	const { setSelectedCardId } = useStoreBoard()
	const router = useRouter()
	const { user } = useAuth()

	const [query, setQuery] = useState('')

	useEffect(() => {
		if (isTyping) {
			setQuery('')
		} else {
			setQuery(searchValue)
		}
	}, [isTyping, setSearchValue, searchValue])

	const pathname = usePathname()

	const handleCloseSearchBox = useCallback(() => {
		setSearchValue('')
		setQuery('')
	}, [setSearchValue, setQuery])

	useEffect(() => {
		handleCloseSearchBox()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	const handleSelect = (
		cardId: string,
		workspaceName: string,
		boardName: string
	) => {
		setSelectedCardId(cardId)

		const path = pathname.replace(/(\/es|\/en)/, '')

		if (
			path !==
			`/b/${workspaceName.toLowerCase()}/${boardName
				.toLowerCase()
				.replace(/\s+/g, '-')}`
		) {
			router.push(
				`/b/${workspaceName.toLowerCase()}/${boardName
					.toLowerCase()
					.replace(/\s+/g, '-')}`
			)
		}
	}

	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!handleCloseSearchBox) return

		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				handleCloseSearchBox()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleCloseSearchBox])

	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

	return (
		<Box sx={NavbarLoggedContainerStyle(theme)}>
			<Box sx={NavbarLoggedInnerWrapperStyle}>
				<Box sx={NavbarLoggedLogoWrapperStyle(theme)}>
					<Box component={Link} href="/u">
						<LogoIcon color={theme.palette.navbar.logoColor} />
					</Box>
				</Box>
				<Box sx={NavbarLoggedSearchSectionStyle}>
					<Box sx={NavbarLoggedSearchWrapperStyle}>
						<Box sx={NavbarLoggedSearchContainerStyle}>
							<Input
								disableUnderline
								placeholder="Buscar"
								fullWidth
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								sx={NavbarLoggedSearchInputStyle(theme)}
								startAdornment={
									<InputAdornment
										position="start"
										sx={NavbarLoggedAdormentIconStyle}
									>
										<SearchIcon />
									</InputAdornment>
								}
							/>
							<Box
								position="absolute"
								sx={NavbarLoggedSearchBoxContainerStyle}
								ref={containerRef}
							>
								{loading && (
									<Box sx={NavbarLoggedSearchLoadingStyle(theme)}>
										<CircularProgress size={16} />
										{t('loading')}
									</Box>
								)}

								{!loading && (
									<SearchBox
										items={results}
										loading={loading}
										query={query}
										hasSearched={hasSearched}
										onSelect={handleSelect}
									/>
								)}
							</Box>
						</Box>
					</Box>
					<Button
						variant="contained"
						sx={NavbarLoggedCreateButtonStyle(theme)}
						onClick={handleClick}
					>
						{t('create')}
					</Button>
					<CreateBoardMenu
						open={open}
						handleClose={handleClose}
						anchorEl={anchorEl}
					/>
				</Box>
				<Box sx={NavbarLoggedActionsStyle}>
					<Avatar
						src={user?.photoURL || undefined}
						sx={AccountMenuNavbarAvatarStyle}
						onClick={(e) => setMenuAnchor(e.currentTarget)}
					>
						{!user?.photoURL && <UserDefaultIcon />}
					</Avatar>

					{menuAnchor && (
						<AccountMenu
							anchorEl={menuAnchor}
							onClose={() => setMenuAnchor(null)}
							router={router}
						/>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default NavbarLogged
