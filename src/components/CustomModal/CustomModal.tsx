import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
import { useStoreTrello } from '@/context/useStoreTrello'
import { ModalStyles } from './CustomModal.styles'
type Props = { children: React.ReactNode; styles?: object }

/**
 * A custom modal component that wraps the Material UI Modal component.
 * It also provides a hook to open and close the modal using the useStoreTrello hook.
 * @param {React.ReactNode} children - The content of the modal.
 * @param {object} styles - Optional styles to apply to the modal container.
 * @returns {JSX.Element} The rendered CustomModal component.
 *@example
 *<CustomModal>...</CustomModal>
 */
const CustomModal = ({ children, styles }: Props) => {
	const { openModal, setOpenModal } = useStoreTrello()
	const handleClose = () => setOpenModal(false)

	return (
		<Modal open={openModal} onClose={handleClose}>
			<Box sx={{ ...ModalStyles, ...styles }}>{children}</Box>
		</Modal>
	)
}

export default CustomModal
