import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import MockPageClient from './MockPageClient'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

/**
 * InnerMockRoute es una ruta protegida que renderiza el componente MockPageClient
 * si la ruta esta definida en el array de rutas y la ruta no esta protegida o publica,
 * de lo contrario renderizara el componente notFound
 * @param {string} locale - el locale de la peticion
 * @param {Promise<{mock: string[]}>} params - los parametros de la ruta
 * @returns {Promise<ReactNode>} - un componente React representando la ruta
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
 * MockRoute es una ruta protegida que renderiza el componente MockPageClient
 * si la ruta esta definida en el array de rutas y la ruta no esta protegida o publica,
 * de lo contrario renderizara el componente notFound
 * @param {Promise<{locale: 'es' | 'en'; mock: string[]}>} params - los parametros de la ruta
 * @returns {Promise<ReactNode>} - un componente React representando la ruta
 */
export default async function MockRoute({
	params,
}: {
	params: Promise<{ locale: 'es' | 'en'; mock: string[] }>
}) {
	const { locale } = await params
	return <InnerMockRoute locale={locale} params={params} />
}
