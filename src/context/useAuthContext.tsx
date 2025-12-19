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
	authReady: boolean
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	authReady: false,
})

export const useAuth = () => useContext(AuthContext)

/**
 * AuthProvider es un componente que proporciona el contexto de autenticacion.
 * @param {ReactNode} children - El contenido a ser renderizado.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [authReady, setAuthReady] = useState(false)

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
			setAuthReady(true)
		})

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading, authReady }}>
			{!authReady ? (
				<Box
					position="fixed"
					left="50%"
					top="50%"
					sx={{ transform: 'translate(-50%, -50%)' }}
					zIndex={9999}
				>
					<CircularProgress size={60} />
				</Box>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
