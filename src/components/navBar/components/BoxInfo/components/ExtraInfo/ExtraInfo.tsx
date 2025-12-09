import { IExtraInfo } from '@/types/navBar'
import { Box } from '@mui/material'
import { ExtraInfoStyle } from './ExtaInfo.styles'
import { useTranslations } from 'next-intl'
import TitleExtraInfo from './Components/Title/TitleExtraInfo'
import DescriptionExtraInfo from './Components/Description/DescriptionExtraInfo'
import ButtonExtraInfo from './Components/Button/ButtonExtraInfo'
import ItemExtraInfo from './Components/Item/ItemExtraInfo'
import LinkExtraInfo from './Components/Link/LinkExtraInfo'

type Props = {
	data: IExtraInfo
	tabSelected: string
	mobileMenu?: boolean
}

/**
 * A component that renders the ExtraInfo section of the Navbar.
 *
 * The ExtraInfo section is the bottom section of the Navbar, which contains
 * a title, description, items, and a link. The items are rendered as links
 * with icons, and the link is rendered as a button with a link icon.
 *
 * @param data - an object containing the data for the ExtraInfo section
 * @param tabSelected - the selected tab in the Navbar
 * @returns a JSX element for the ExtraInfo section
 */
const ExtraInfo = ({ data, tabSelected, mobileMenu = false }: Props) => {
	const t = useTranslations(`Drawer.${tabSelected}.extraInfo`)

	return (
		<Box sx={ExtraInfoStyle}>
			<Box>
				<TitleExtraInfo text={t(`${data.title}`)} mobileMenu={mobileMenu} />

				{data.description && (
					<DescriptionExtraInfo text={t(`${data.description}`)} />
				)}
				{data.items && !mobileMenu && (
					<ItemExtraInfo data={data} tabSelected={tabSelected} />
				)}

				{data.link && (
					<LinkExtraInfo
						linkButton={t(`${data.linkText}`)}
						linkTitle={'/' + t(`${data.link}`)}
					/>
				)}
			</Box>

			{data.button && (
				<ButtonExtraInfo
					text={t(`${data.button}`)}
					linkButton={data.buttonLink ? '/' + t(data.buttonLink) : ''}
				/>
			)}
		</Box>
	)
}

export default ExtraInfo
