import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import MockPageClient from './MockPageClient'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

/**
 * InnerMockRoute is a protected route that renders MockPageClient component
 * if the route is defined in the routes constant and the route is not
 * protected or public, otherwise it will render the notFound component
 * @param {string} locale - the locale of the request
 * @param {Promise<{mock: string[]}>} params - the route parameters
 * @returns {Promise<ReactNode>} - a React component representing the route
 */
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

/**
 * MockRoute is a protected route that renders MockPageClient component
 * if the route is defined in the routes constant and the route is not
 * protected or public, otherwise it will render the notFound component
 * @param {Promise<{locale: 'es' | 'en'; mock: string[]}>} params - the route parameters
 * @returns {Promise<ReactNode>} - a React component representing the route
 */
export default async function MockRoute({
	params,
}: {
	params: Promise<{ locale: 'es' | 'en'; mock: string[] }>
}) {
	const { locale } = await params
	return <InnerMockRoute locale={locale} params={params} />
}
