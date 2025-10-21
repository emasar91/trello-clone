import BoardPage from '@/components/Pages/BoardPage/BoardPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

async function page({
	params,
}: {
	params: { boardname: string; username: string }
}) {
	const { boardname, username } = await params
	return (
		//crear board empezar con el tablero
		<ProtectedPage isProtected>
			<BoardPage boardname={boardname} workspace={username} />
		</ProtectedPage>
	)
}

export default page
