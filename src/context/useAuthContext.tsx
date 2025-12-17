'use client'

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'
import { User, onIdTokenChanged } from 'firebase/auth'
import { firebaseAuth } from '@/config/FireBaseConfig'
import { Box, CircularProgress } from '@mui/material'

type AuthContextType = {
	user: User | null
	loading: boolean
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
})

export const useAuth = () => useContext(AuthContext)

/**
 * AuthProvider component que envuelve los hijos con un AuthContextProvider.
 * Escucha onIdTokenChanged y actualiza el estado del usuario y el estado de carga de manera correspondiente.
 * Si el usuario está registrado, establece un cookie de token de autenticación con el token del usuario.
 * Si el usuario está desregistrado, elimina el cookie de token de autenticación.
 * Cuando el componente se desmonta, elimina el oyente.
 * @param {ReactNode} children - Los hijos para envolver con el AuthContextProvider.
 * @returns {ReactNode} The wrapped children with the AuthContextProvider.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onIdTokenChanged(firebaseAuth, async (firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser)
				const token = await firebaseUser.getIdToken()
				document.cookie = `authToken=${token}; path=/;`
			} else {
				setUser(null)
				document.cookie = `authToken=; path=/; max-age=0;`
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{loading ? (
				<Box position={'absolute'} left={'50%'} top={'50%'} zIndex={9999}>
					<CircularProgress size={60} />
				</Box>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
