import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
import { useStoreTrello } from '@/context/useStoreTrello'
import { ModalStyles } from './CustomModal.styles'
type Props = { children: React.ReactNode; styles?: object }

/**
 * CustomModal component that renders a modal dialog using MUI's Modal component.
 *
 * This component utilizes Zustand for state management to control the open state of the modal.
 * It accepts children elements to be rendered inside the modal and allows for additional
 * styling through the styles prop.
 *
 * - The modal is opened or closed based on the openModal state.
 * - The modal can be closed by triggering the onClose event, which calls handleClose
 *   to update the state.
 *
 * @param {Props} props - The props for the CustomModal component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {object} [props.styles] - Optional additional styles to be applied to the modal content.
 *
 * @returns {React.ReactElement} The rendered modal component with its children.
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
