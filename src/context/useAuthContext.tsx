'use client'

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
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

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			async (firebaseUser) => {
				if (firebaseUser) {
					setUser(firebaseUser)
					const token = await firebaseUser.getIdToken()
					document.cookie = `authToken=${token}; path=/;`
				} else {
					setUser(null)
					document.cookie = `authToken=; path=/; max-age=0;`
				}
				setLoading(false)
			}
		)

		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{loading ? (
				<Box sx={{ position: 'absolute', left: '50%', top: '50%' }}>
					<CircularProgress size={60} />
				</Box>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}
