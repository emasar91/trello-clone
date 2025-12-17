import Modal from '@mui/material/Modal'
import { Box } from '@mui/material'
import { useStoreTrello } from '@/context/useStoreTrello'
import { ModalStyles } from './CustomModal.styles'
type Props = { children: React.ReactNode; styles?: object }

/**
 * CustomModal es un componente que envuelve el componente Modal de Material UI.
 * También proporciona una hook para abrir y cerrar el modal usando el hook useStoreTrello.
 * @param {React.ReactNode} children - El contenido del modal.
 * @param {object} styles - Estilos opcionales para aplicar al contenedor del modal.
 * @returns {JSX.Element} El componente CustomModal renderizado.
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
