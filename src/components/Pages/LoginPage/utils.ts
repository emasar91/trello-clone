import { firebaseAuth, googleProvider } from '@/config/FireBaseConfig'
import { IUserInfo } from '@/types/user'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export const signInGoogle = async ({
	setUserInfo,
}: {
	setUserInfo: (userInfo: IUserInfo) => void
}) => {
	try {
		const { user } = await signInWithPopup(firebaseAuth, googleProvider)
		if (user) {
			const { displayName, email, photoURL } = user
			setUserInfo({
				displayName: displayName ?? '',
				email: email ?? '',
				photoURL: photoURL ?? '',
			})
			checkUserAlreadyExists(email ?? '')
		}
	} catch (e) {
		console.log('🚀 ~ handleLogin ~ e:', e)
		console.log('Error al iniciar sesión con Google', e)
	}
}

export const signInEmail = async ({
	setUserInfo,
	emailForm,
	passwordForm,
}: {
	setUserInfo: (userInfo: IUserInfo) => void
	emailForm: string
	passwordForm: string
}) => {
	if (isValidEmail(emailForm)) {
		try {
			const { user } = await signInWithEmailAndPassword(
				firebaseAuth,
				emailForm,
				passwordForm
			)
			if (user) {
				const { displayName, photoURL } = user
				setUserInfo({
					displayName: displayName ?? emailForm.split('@')[0],
					email: emailForm,
					photoURL: photoURL ?? '',
				})

				checkUserAlreadyExists(emailForm)
			}
		} catch {
			console.log('Credenciales incorrectas')
		}
	} else {
		console.log('El email no es valido')
	}
}

const checkUserAlreadyExists = async (email: string) => {
	console.log('🚀 ~ checkUserAlreadyExists ~ email:', email)
	// const userInfo = await ChatAPI.getUserInfo(email)
	// if (!userInfo.user) {
	// } else {
	// 	redirectPage('/', router)
	// }
}

const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
const isValidEmail = (email: string): boolean => {
	return emailRegex.test(email)
}
