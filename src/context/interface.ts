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
	setTabSelected: (value: TabsOptions) => void
	setDrawerOpen: (value: boolean) => void
}
