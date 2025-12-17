import { useState } from 'react'
import { Box } from '@mui/material'
import { Plus } from '@/public/assets/icons/Plus'
import CreateCardInput from '../../../components/TextAreaCustom/TextAreaCustom'
import { ColumnAdderAddColumnStyles } from './ColumnAdder.styles'
import { useTranslations } from 'next-intl'

/**
 * Componente que representa un botón para agregar una nueva columna.
 * Envuelve el componente `Box` y le añade la lógica de `useTranslations`.
 * @param {Function} onCreate - Función para crear una nueva columna
 * @returns {JSX.Element} - El componente ColumnAdder
 */
const ColumnAdder = ({ onCreate }: { onCreate: (title: string) => void }) => {
	const [show, setShow] = useState(false)
	const t = useTranslations('BoardsPage')

	if (!show) {
		return (
			<Box onClick={() => setShow(true)} sx={ColumnAdderAddColumnStyles}>
				<Plus />
				{t('addColumn')}
			</Box>
		)
	}

	return (
		<CreateCardInput
			type="column"
			onCreate={(title: string) => {
				onCreate(title)
				setShow(false)
			}}
			onCancel={() => setShow(false)}
		/>
	)
}

export default ColumnAdder
