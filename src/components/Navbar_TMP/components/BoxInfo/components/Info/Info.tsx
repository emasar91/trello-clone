import { IDataInfo } from '@/types/navBar'
import { Box } from '@mui/material'
import { InfoStyle } from './Info.styles'
import { useTranslations } from 'next-intl'
import TitleInfo from './components/Title/TitleInfo'
import ItemInfo from './components/Item/ItemInfo'
import ItemFullWidth from './components/ItemFullWidth/ItemFullWidth'

type Props = {
	data: IDataInfo
	tabSelected: string
}

/**
 * Info component for the BoxInfo component.
 *
 * Renders a Box containing information relevant to the selected tab.
 * The information consists of a title and a list of items.
 *
 * The items can be either regular items or full-width items.
 * Regular items are rendered as a list of links with an icon and a title.
 * Full-width items are rendered as a list of links with a title and a description.
 *
 * The component uses the useTranslations hook to translate the text
 * for the title and items.
 *
 * @param {IDataInfo} data - The data for the info component.
 * @param {string} tabSelected - The currently selected tab.
 * @returns {React.ReactElement} The Info component.
 */
const Info = ({ data, tabSelected }: Props) => {
	const t = useTranslations(`Drawer.${tabSelected}.info`)

	return (
		<Box sx={InfoStyle}>
			{data.title && <TitleInfo text={t(`${data.title}`)} />}

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					margin: '0px -1rem',
					gap: '1rem 0px',
				}}
			>
				<ItemInfo data={data} tabSelected={tabSelected} />

				{data.itemsFullWidth && (
					<ItemFullWidth data={data} tabSelected={tabSelected} />
				)}
			</Box>
		</Box>
	)
}

export default Info
