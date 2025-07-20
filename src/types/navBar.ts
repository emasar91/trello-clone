export interface ITabItem {
	title: string
	description: string
	button?: string
}

export interface IExtraInfo {
	title: string
	description?: string
	button?: string
	link?: string
	items?: IExtraItem[]
}

interface IExtraItem {
	title: string
	description: string
}

export interface IDrawer {
	items: ITabItem[]
	extraInfo?: IExtraInfo
}

export interface ITab {
	tab: string
	drawer?: IDrawer
}
