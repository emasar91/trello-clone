import { Box, Button, TextField, useTheme } from '@mui/material'
import React from 'react'
import {
	CreateEditCommentButtonCancelStyles,
	CreateEditCommentButtonsContainerStyles,
	CreateEditCommentContainerStyles,
	CreateEditCommentInputStyles,
} from './CreateEditComment.styles'

type Props = {
	value: string
	setvalue: React.Dispatch<React.SetStateAction<string>>
	onSubmit: () => void
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	type: 'new' | 'edit'
}

const CreateEditComment = ({
	value,
	setvalue,
	onSubmit,
	setShow,
	type = 'new',
}: Props) => {
	const theme = useTheme()
	return (
		<Box sx={CreateEditCommentContainerStyles(type)}>
			<TextField
				multiline
				autoFocus
				rows={3}
				variant="outlined"
				fullWidth
				maxRows={3}
				value={value}
				onChange={(e) => {
					const text = e.target.value
					const lines = text.split('\n')

					if (lines.length <= 3) {
						setvalue(e.target.value)
					}
				}}
				sx={CreateEditCommentInputStyles(theme)}
			/>
			<Box sx={CreateEditCommentButtonsContainerStyles}>
				<Button variant="contained" onClick={onSubmit}>
					Guardar
				</Button>
				<Button
					sx={CreateEditCommentButtonCancelStyles(theme)}
					onClick={() => {
						setShow(false)
					}}
				>
					Cancelar
				</Button>
			</Box>
		</Box>
	)
}

export default CreateEditComment
