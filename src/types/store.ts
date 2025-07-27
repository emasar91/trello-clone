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
	setTabSelected: (value: TabsOptions) => void
	setDrawerOpen: (value: boolean) => void
	setBoxInfo: (value: IDrawer) => void
}
