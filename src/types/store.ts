import { ITabItem } from '@/types/navBar'

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
	itemsBoxInfo: ITabItem[] | null
	setTabSelected: (value: TabsOptions) => void
	setDrawerOpen: (value: boolean) => void
	setItemsBoxInfo: (value: ITabItem[]) => void
}
