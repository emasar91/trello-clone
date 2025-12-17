import MockPageClient from '@/components/Pages/MockPage/MockPageClient'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'
import { routes } from '@/constants'
import { notFound } from 'next/navigation'

async function getCurrentPath(params: { mock?: string[] }) {
	const { mock } = await params
	if (!mock) return ''
	return mock.join('/')
}

/**
 * MockRoute is a protected route that renders MockPageClient component
 * if the route is defined in the routes constant and the route is not
 * protected or public, otherwise it will render the notFound component
 * @param {Object} params - an object containing the route parameters
 * @param {string} params.mock - the mock route parameter
 * @return {Promise<ReactNode>} - a React component representing the route
 */
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
