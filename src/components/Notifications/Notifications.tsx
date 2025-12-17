import * as React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * NotificationContainer es un componente que renderiza un contenedor de notificaciones
 * usando react-toastify.
 * Es una proveida  con una configuracion por defecto para las notificaciones
 * y soporta arrastrar y soltar.
 * @return {React.ReactElement} El componente NotificationContainer.
 */
const NotificationContainer: React.FunctionComponent = () => {
	return (
		<ToastContainer
			stacked
			position="bottom-left"
			autoClose={1500}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			draggable
			theme="colored"
			transition={Bounce}
		/>
	)
}

export default NotificationContainer
