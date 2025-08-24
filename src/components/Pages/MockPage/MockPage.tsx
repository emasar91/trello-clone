import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import MockPageClient from './MockPageClient'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

export async function InnerMockRoute({
	locale,
	params,
}: {
	locale: 'en' | 'es'
	params: Promise<{ mock: string[] }>
}) {
	if (!routing.locales.includes(locale)) {
		notFound()
	}

	const { mock } = await params
	if (!mock) return ''
	const messages = await getMessages({ locale })
	const currentPath = mock?.join('/') || ''

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<MockPageClient route={currentPath} />
		</NextIntlClientProvider>
	)
}

export default async function MockRoute({
	params,
}: {
	params: Promise<{ locale: 'es' | 'en'; mock: string[] }>
}) {
	const { locale } = await params
	return <InnerMockRoute locale={locale} params={params} />
}
