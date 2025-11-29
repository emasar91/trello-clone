import { useState } from 'react'
import { Box } from '@mui/material'
import { Plus } from '@/public/assets/icons/Plus'
import CreateCardInput from '../../../components/TextAreaCustom/TextAreaCustom'
import { ColumnAdderAddColumnStyles } from './ColumnAdder.styles'

const ColumnAdder = ({ onCreate }: { onCreate: (title: string) => void }) => {
	const [show, setShow] = useState(false)

	if (!show) {
		return (
			<Box onClick={() => setShow(true)} sx={ColumnAdderAddColumnStyles}>
				<Plus />
				Añade otra lista
			</Box>
		)
	}

	return (
		<CreateCardInput
			type="column"
			onCreate={(title) => {
				onCreate(title)
				setShow(false)
			}}
			onCancel={() => setShow(false)}
		/>
	)
}

export default ColumnAdder
