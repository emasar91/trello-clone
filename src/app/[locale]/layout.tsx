import './globals.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from '@/i18n/routing'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

// ✅ Metadata dinámica
export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const messages = await getMessages({ locale: params.locale })
	const t = messages?.Page as Record<string, string>

	return {
		title: t?.title || 'Default Title',
		description: t?.description || 'Default description',
	}
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: 'en' | 'es' }
}) {
	const { locale } = params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	const allowedLocales = ['en', 'es']

	if (!allowedLocales.includes(locale)) {
		notFound()
	}

	const messages = await getMessages({ locale: locale as 'en' | 'es' })

	return (
		<html lang={locale}>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
