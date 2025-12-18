import { CardIcon } from '@/public/assets/icons/CardIcon'
import { CommentIcon } from '@/public/assets/icons/CommentIcon'
import { DescriptionIcon } from '@/public/assets/icons/DescriptionIcon'
import {
	Box,
	List,
	ListItemButton,
	ListItemText,
	Typography,
	useTheme,
} from '@mui/material'
import {
	SearchBoxContainerStyle,
	SearchBoxEmptyStateStyle,
	SearchBoxHeaderStyle,
	SearchBoxItemIconStyle,
	SearchBoxItemPrimaryTextStyle,
	SearchBoxItemSecondaryTextStyle,
	SearchBoxItemStyle,
} from './SearchBox.styles'
import { useTranslations } from 'next-intl'

export type MatchSource = 'title' | 'description' | 'comment'

export interface SearchCardResult {
	cardId: string
	cardTitle: string
	matchSource: MatchSource
	snippet: string
	commentAuthor?: string
	column: {
		id: string
		name: string
	}
	board: {
		id: string
		name: string
	}
	workspace: {
		id: string
		name: string
	}
}

interface ISearchBoxProps {
	items: SearchCardResult[]
	onSelect: (cardId: string, workspaceName: string, boardName: string) => void
	loading?: boolean
	query: string
	hasSearched: boolean
}

/**
 * Component to show search results in the navbar.
 * @param {ISearchBoxProps} props
 * @returns {JSX.Element}
 * @example
 * const items = [...]
 * const onSelect = (cardId: string, workspaceName: string, boardName: string) => void
 * const query = ""
 * const loading = false
 * const hasSearched = false
 *
 * <SearchBox items={items} onSelect={onSelect} query={query} loading={loading} hasSearched={hasSearched} />
 */
const SearchBox = ({
	items,
	onSelect,
	query,
	loading,
	hasSearched,
}: ISearchBoxProps) => {
	const theme = useTheme()
	const t = useTranslations('NavbarLogged')

	if (!query) {
		return null
	}

	const showEmptyState = hasSearched && !loading && items.length === 0

	return (
		<Box sx={SearchBoxContainerStyle(theme)}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
				{hasSearched && (
					<Typography variant="caption" sx={SearchBoxHeaderStyle(theme)}>
						{t('searchBox.header')}
					</Typography>
				)}

				{showEmptyState && (
					<Typography variant="caption" sx={SearchBoxEmptyStateStyle(theme)}>
						{t('searchBox.emptyState')}
					</Typography>
				)}
			</Box>

			{items.length > 0 && (
				<List disablePadding>
					{items.map((item) => {
						const isTitleMatch = item.matchSource === 'title'

						const primaryContent = isTitleMatch
							? getHighlightedSnippet(item.cardTitle, query)
							: getHighlightedSnippet(item.snippet, query)

						const secondaryText = isTitleMatch
							? `${capitalize(item.workspace.name)} · ${capitalize(
									item.board.name
							  )} · ${capitalize(item.column.name)}`
							: `${capitalize(item.workspace.name)} · ${capitalize(
									item.board.name
							  )} · ${capitalize(item.column.name)} · ${capitalize(
									item.cardTitle
							  )}`

						return (
							<ListItemButton
								key={item.cardId}
								onClick={() =>
									onSelect(item.cardId, item.workspace.name, item.board.name)
								}
								sx={SearchBoxItemStyle(theme)}
							>
								<Box sx={SearchBoxItemIconStyle(theme)}>
									{isTitleMatch ? (
										<CardIcon />
									) : item.matchSource === 'comment' ? (
										<CommentIcon width={24} height={24} />
									) : (
										<DescriptionIcon width={24} height={24} />
									)}
								</Box>

								<ListItemText
									primary={
										<Typography
											variant="body2"
											sx={SearchBoxItemPrimaryTextStyle(theme)}
										>
											{primaryContent}
										</Typography>
									}
									secondary={
										<Typography
											variant="caption"
											sx={SearchBoxItemSecondaryTextStyle(theme)}
										>
											{secondaryText}
										</Typography>
									}
								/>
							</ListItemButton>
						)
					})}
				</List>
			)}
		</Box>
	)
}

export default SearchBox

/**
 * Resalta la coincidencia en el texto.
 * @param {string} text - Texto original.
 * @param {string} query - Búsqueda.
 * @param {number} length - Longitud del recorte.
 * @returns {string} - Texto con la coincidencia resaltada.
 */
function getHighlightedSnippet(text: string, query: string, length = 60) {
	// 1️⃣ Si no hay texto o búsqueda, devolvemos vacío
	if (!text || !query) return text

	const index = text.toLowerCase().indexOf(query.toLowerCase())
	if (index === -1) return text

	// 2️⃣ Calcular el inicio y final del recorte, centrado en la coincidencia
	const start = Math.max(0, index - Math.floor(length / 2))
	const end = Math.min(
		text.length,
		index + query.length + Math.floor(length / 2)
	)

	// 3️⃣ Extraer el trozo del texto alrededor de la coincidencia
	const snippet = text.slice(start, end)

	// 4️⃣ Resaltar la coincidencia
	const highlighted = snippet
		.split(new RegExp(`(${query})`, 'ig'))
		.map((part, index) =>
			part.toLowerCase() === query.toLowerCase() ? (
				<span
					key={index}
					style={{
						backgroundColor: '#b0e1ff',
						borderRadius: 1,
						padding: '0 2px',
						color: 'black',
					}}
				>
					{part}
				</span>
			) : (
				part
			)
		)

	// 5️⃣ Si el texto original es más largo que el recorte, agregamos "..."
	return start > 0 ? `...${highlighted}` : highlighted
}

function capitalize(text: string) {
	if (!text) return ''
	return text.charAt(0).toUpperCase() + text.slice(1)
}
