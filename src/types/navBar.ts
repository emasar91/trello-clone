export interface ITabItem {
	title: string
	description: string
	button?: string
}

export interface IExtraInfo {
	title: string
	description?: string
	button?: string
	buttonLink?: string
	link?: string
	linkText?: string
	items?: IExtraItem[]
}

interface IExtraItem {
	title: string
	description: string
	link: string
}

export interface IDrawer {
	title?: string
	items: ITabItem[]
	extraInfo?: IExtraInfo
}

export interface ITab {
	tab: TabsOptions
	drawer?: IDrawer
}

export type TabsOptions =
	| 'features'
	| 'solutions'
	| 'plans'
	| 'pricing'
	| 'resources'
	| ''
