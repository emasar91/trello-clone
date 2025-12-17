import BoardPage from '@/components/Pages/BoardPage/BoardPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

/**
 * Page es un componente que renderiza el componente BoardPage protegido.
 * @param {object} params - Object con boardname y username como propiedades.
 * @returns {JSX.Element} - ProtectedPage con BoardPage como hijo.
 */
async function page({
	params,
}: {
	params: { boardname: string; username: string }
}) {
	const { boardname, username } = await params
	return (
		<ProtectedPage isProtected>
			<BoardPage boardname={boardname} workspace={username} />
		</ProtectedPage>
	)
}

export default page
