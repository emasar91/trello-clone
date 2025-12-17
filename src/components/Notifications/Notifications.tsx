import * as React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * A React component that renders a notification container
 * using react-toastify.
 * It provides a default configuration for the notifications
 * and supports drag and drop.
 * @return {React.ReactElement} A React element representing the notification container.
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
