import BoardPage from '@/components/Pages/BoardPage/BoardPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

function page({ params }: { params: { boardname: string; username: string } }) {
	const { boardname, username } = params
	console.log('🚀 ~ page ~ boardname:', boardname)
	console.log('🚀 ~ page ~ username:', username)
	return (
		//crear board empezar con el tablero
		<ProtectedPage isProtected>
			<BoardPage boardname={boardname} workspace={username} />
		</ProtectedPage>
	)
}

export default page
