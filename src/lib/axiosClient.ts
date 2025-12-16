import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
	withCredentials: true,
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status

		if (status === 401) {
			toast.error('Tu sesión expiró, por favor volvé a iniciar sesión.')
			document.cookie = 'authToken=; Max-Age=0; path=/;'
		}

		return Promise.reject(error)
	}
)

export default api
