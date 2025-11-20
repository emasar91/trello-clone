import { MultipleContainers } from '../MultipleContainers/MultipleContainers'

export const ManyItems = () => {
	const initials = {
		A: [
			{ id: 'A1', text: 'A1' },
			{ id: 'A2', text: 'A2' },
			{ id: 'A3', text: 'A3' },
			{ id: 'A4', text: 'A4' },
			{ id: 'A6', text: 'A6' },
			{ id: 'A8', text: 'A8' },
			{ id: 'A10', text: 'A10' },
			{ id: 'A11', text: 'A11' },
			{ id: 'A12', text: 'A12' },
			{ id: 'A13', text: 'A13' },
			{ id: 'A14', text: 'A14' },
			{ id: 'A15', text: 'A15' },
			{ id: 'A16', text: 'A16' },
			{ id: 'A17', text: 'A17' },
			{ id: 'A18', text: 'A18' },
			{ id: 'A19', text: 'A19' },
			{ id: 'A20', text: 'A20' },
			{ id: 'A21', text: 'A21' },
			{ id: 'A22', text: 'A22' },
			{ id: 'A23', text: 'A23' },
			{ id: 'A24', text: 'A24' },
			{ id: 'A25', text: 'A25' },
			{ id: 'A26', text: 'A26' },
			{ id: 'A27', text: 'A27' },
			{ id: 'A28', text: 'A28' },
			{ id: 'A29', text: 'A29' },
			{ id: 'A30', text: 'A30' },
		],
		B: [
			{ id: 'B1', text: 'B1' },
			{ id: 'B2', text: 'B2' },
			{ id: 'B3', text: 'B3' },
		],

		E: [],
	}

	return (
		<MultipleContainers
			containerStyle={{
				maxHeight: '85vh',
			}}
			items={initials}
			scrollable
		/>
	)
}
