import './globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import NavBar from '@/components/Navbar/NavBar'
import Footer from '@/components/Footer/Footer'
import { AuthProvider } from '@/context/useAuthContext'
import { ThemeWrapper } from './ThemeWrapper'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params

	const messages = await getMessages({ locale })
	const t = messages?.Page as Record<string, string>

	return {
		title: t?.title || 'Default Title',
		description: t?.description || 'Default description',
	}
}

/**
 * The InnerLayout function generates a docstring that is used to create a component
 * given the children and locale.
 * If the locale is not found, it will return not found.
 * The function returns a promise that resolves to the metadata.
 * The InnerLayout function returns a promise that resolves to the following:
 * the metadata containing the locale
 * the title
 * the description
 * the NextIntlClientProvider locale
 * the title and description
 * the NextIntlClientProvider messages
 * the ThemeWrapper
 * the AuthProvider
 * the AppRouterCacheProvider
 */
async function InnerLayout({
	children,
	locale,
}: {
	children: React.ReactNode
	locale: 'en' | 'es'
}) {
	if (!routing.locales.includes(locale)) {
		notFound()
	}

	const messages = await getMessages({ locale })

	return (
		<html lang={locale}>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<AppRouterCacheProvider options={{ key: 'css' }}>
					<NextIntlClientProvider locale={locale} messages={messages}>
						<ThemeWrapper>
							<AuthProvider>
								<div className="min-h-screen flex flex-col">
									<NavBar />
									<main className="flex-1 flex flex-col items-center justify-center">
										{children}
									</main>
									<Footer />
								</div>
							</AuthProvider>
						</ThemeWrapper>
					</NextIntlClientProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}

export default async function LocalLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: 'es' | 'en' }>
}) {
	const { locale } = await params
	return <InnerLayout locale={locale}>{children}</InnerLayout>
}
