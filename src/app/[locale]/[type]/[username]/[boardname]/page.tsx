import BoardPage from '@/components/Pages/BoardPage/BoardPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

/**
 * Page component for boards.
 *
 * @param {object} params - Object with boardname and username properties.
 *
 * @returns {JSX.Element} - ProtectedPage component with BoardPage child.
 *
 * @example
 * <Page boardname="myboard" username="john" />
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
