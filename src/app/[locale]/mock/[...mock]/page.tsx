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
 * MockRoute es una ruta protegida que renderiza el componente MockPageClient
 * si la ruta está definida en la constante routes y la ruta no está
 * protegida o pública, de lo contrario renderizará el componente notFound
 * @param {Object} params - un objeto que contiene los parámetros de la ruta
 * @param {string} params.mock - el parámetro de la ruta mock
 * @return {Promise<ReactNode>} - un componente React que representa la ruta
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
