import MockPageClient from '@/components/Pages/MockPage/MockPageClient'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'
import { routes } from '@/constants'
import { notFound } from 'next/navigation'

async function getCurrentPath(params: { mock?: string[] }) {
	const { mock } = await params
	if (!mock) return ''
	return mock.join('/')
}

export default async function MockRoute({
	params,
}: {
	params: { mock?: string[] }
}) {
	const currentPath = await getCurrentPath(params)

	if (!routes.includes(currentPath)) {
		return notFound()
	}
	return (
		<ProtectedPage isProtected={false} isMockPublic={true}>
			<MockPageClient route={currentPath} />
		</ProtectedPage>
	)
}
