import { SxProps, Theme } from '@mui/material'

export const BoardListGridStyle: SxProps<Theme> = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(23%, 1fr))',
	columnGap: '2%',
}
