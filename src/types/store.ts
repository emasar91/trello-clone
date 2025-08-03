import { IDrawer } from '@/types/navBar'

export type TabsOptions =
	| 'features'
	| 'solutions'
	| 'plans'
	| 'pricing'
	| 'resources'
	| ''

export interface IStoreTrello {
	tabSelected: TabsOptions
	drawerOpen: boolean
	boxInfo: IDrawer | null
	openModal: boolean
	setTabSelected: (value: TabsOptions) => void
	setDrawerOpen: (value: boolean) => void
	setBoxInfo: (value: IDrawer) => void
	setOpenModal: (value: boolean) => void
}
