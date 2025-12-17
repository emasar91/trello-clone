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
 * AuthProvider component that wraps children with an AuthContextProvider.
 * Listens to onIdTokenChanged and updates the user and loading state accordingly.
 * If the user is logged in, sets an auth token cookie with the user's id token.
 * If the user is logged out, removes the auth token cookie.
 * When the component is unmounted, removes the listener.
 * @param {ReactNode} children - The children to wrap with the AuthContextProvider.
 * @returns {ReactNode} The wrapped children with the AuthContextProvider.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onIdTokenChanged(firebaseAuth, async (firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser)
				const token = await firebaseUser.getIdToken() // token SIEMPRE actualizado
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
