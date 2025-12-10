import { SxProps, Theme } from '@mui/material'

export const BoardListGridStyle: SxProps<Theme> = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(max(23%, 180px), 1fr))',
	columnGap: '2%',
	rowGap: '2%',
}
