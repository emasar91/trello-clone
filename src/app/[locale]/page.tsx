import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import PageContainer from '@/components/pageContainer/PageContainer'

export default function HomePage() {
	const t = useTranslations('HomePage')
	return (
		<PageContainer>
			<h1>{t('title')}</h1>
			<Link href="/about">{t('about')}</Link>
		</PageContainer>
	)
}
