import { IDrawer } from '@/types/navBar'
import { IUserInfo } from './user'

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
	userInfo: IUserInfo
	setTabSelected: (value: TabsOptions) => void
	setDrawerOpen: (value: boolean) => void
	setBoxInfo: (value: IDrawer) => void
	setOpenModal: (value: boolean) => void
	setUserInfo: (value: IUserInfo) => void
}
