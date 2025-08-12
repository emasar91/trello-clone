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
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'
import NavBar from '@/components/Navbar/NavBar'
import BoxInfo from '../../components/Navbar/components/BoxInfo/BoxInfo'
import Footer from '@/components/Footer/Footer'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const messages = await getMessages({ locale })
	const t = messages?.Page as Record<string, string>

	return {
		title: t?.title || 'Default Title',
		description: t?.description || 'Default description',
	}
}

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
						<ThemeProvider theme={theme}>
							<div className="flex flex-col justify-center items-center">
								<NavBar />
								<BoxInfo />
								{children}
								<Footer />
							</div>
						</ThemeProvider>
					</NextIntlClientProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: 'en' | 'es' }
}) {
	return <InnerLayout locale={params.locale}>{children}</InnerLayout>
}
