import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

function page() {
	return (
		//crear board empezar con el tablero
		<ProtectedPage isProtected>
			<Board />
		</ProtectedPage>
	)
}

export default page
