import { CalendarIcon } from '@/public/assets/icons/CalendarIcon'
import { EmilMagicIcon } from '@/public/assets/icons/EmailMagicIcon'

export const tabsNavbar = [
	{
		tab: 'features',
		drawer: {
			title: 'featuresTitle',
			items: [
				{
					title: 'inbox',
					description: 'inboxDescription',
					link: 'inboxLink',
					icon: 'inbox',
				},
				{
					title: 'planner',
					description: 'plannerDescription',
					link: 'plannerLink',
					icon: 'planner',
				},
				{
					title: 'automation',
					description: 'automationDescription',
					link: 'automationLink',
					icon: 'automation',
				},
				{
					title: 'power-ups',
					description: 'powerUpsDescription',
					link: 'power-upsLink',
					icon: 'power-ups',
				},
				{
					title: 'templates',
					description: 'templatesDescription',
					link: 'templatesLink',
					icon: 'templates',
				},
				{
					title: 'integrations',
					description: 'integrationsDescription',
					link: 'integrationsLink',
					icon: 'integrations',
				},
			],
			extraInfo: {
				title: 'featuresExtraTitle',
				description: 'featuresExtraDescription',
				button: 'featuresExtraButton',
				buttonLink: 'featuresExtraButtonLink',
			},
		},
	},
	{
		tab: 'solutions',
		drawer: {
			title: 'solutionsTitle',
			items: [
				{
					title: 'marketingTeams',
					description: 'marketingTeamsDescription',
					link: 'marketingTeamsLink',
					icon: 'marketingTeams',
				},
				{
					title: 'productManagement',
					description: 'productManagementDescription',
					link: 'productManagementLink',
					icon: 'productManagement',
				},
				{
					title: 'engineeringTeams',
					description: 'engineeringTeamsDescription',
					link: 'engineeringTeamsLink',
					icon: 'engineeringTeams',
				},
				{
					title: 'designTeams',
					description: 'designTeamsDescription',
					link: 'designTeamsLink',
					icon: 'designTeams',
				},
				{
					title: 'startups',
					description: 'startupsDescription',
					link: 'startupsLink',
					icon: 'startups',
				},
				{
					title: 'remoteTeams',
					description: 'remoteTeamsDescription',
					link: 'remoteTeamsLink',
					icon: 'remoteTeams',
				},
			],
			extraInfo: {
				title: 'solutionsExtraTitle',
				link: 'solutionsExtraLink',
				linkText: 'solutionsExtraLinkText',
				items: [
					{ title: 'title1', description: 'description1', link: 'link1' },
					{ title: 'title2', description: 'description2', link: 'link2' },
					{ title: 'title3', description: 'description3', link: 'link3' },
				],
			},
		},
	},
	{
		tab: 'plans',
		drawer: {
			items: [
				{
					title: 'standard',
					description: 'standardDescription',
					link: 'standardLink',
					icon: 'standard',
				},
				{
					title: 'premium',
					description: 'premiumDescription',
					link: 'premiumLink',
					icon: 'premium',
				},
				{
					title: 'enterprise',
					description: 'enterpriseDescription',
					link: 'enterpriseLink',
					icon: 'enterprise',
				},
				,
			],
			itemsFullWidth: [
				{
					title: 'free',
					description: 'freeDescription',
					icon: 'free',
					button: 'freeButton',
					link: 'freeLink',
				},
			],
			extraInfo: {
				title: 'plansExtraTitle',
				description: 'plansExtraDescription',
				button: 'plansExtraButton',
				buttonLink: 'plansExtraButtonLink',
			},
		},
	},
	{ tab: 'pricing' },
	{
		tab: 'resources',
		drawer: {
			title: 'resourcesTitle',
			items: [
				{
					title: 'trelloGuide',
					description: 'trelloGuideDescription',
					link: 'trelloGuideLink',
				},
				{
					title: 'remoteWorkGuide',
					description: 'remoteWorkGuideDescription',
					link: 'remoteWorkGuideLink',
				},
				{
					title: 'webinars',
					description: 'webinarsDescription',
					link: 'webinarsLink',
				},
				{
					title: 'customersStories',
					description: 'customersStoriesDescription',
					link: 'customersStoriesLink',
				},
				{
					title: 'developers',
					description: 'developersDescription',
					link: 'developersLink',
				},
				{
					title: 'helpResources',
					description: 'helpResourcesDescription',
					link: 'helpResourcesLink',
				},
			],
			extraInfo: {
				title: 'resourcesExtraTitle',
				description: 'resourcesExtraDescription',
				button: 'resourcesExtraButton',
				buttonLink: 'resourcesExtraButtonLink',
			},
		},
	},
]

export const itemsSliderSection2 = [
	{ title: 'Inbox' },
	{ title: 'Boards' },
	{
		title: 'Planner',
	},
]

export const featureSection3 = [
	{
		title: 'EmailMagic',
		icon: <EmilMagicIcon />,
		sideImage: 'left',
	},
	{
		title: 'MessageAppSorcery',
		icon: <CalendarIcon />,
		sideImage: 'right',
	},
]

export const featureItemsSection4 = [
	{
		title: 'Integrations',
	},
	{
		title: 'ButlerAutomation',
	},
	{
		title: 'CardMirroring',
	},
]

export const itemsSliderSection5 = [
	{ title: 'slide1' },
	{ title: 'slide2' },
	{
		title: 'slide3',
	},
]

export const footerItems = ['AboutTrello', 'Jobs', 'Apps', 'ContactUs']

export const routes = [
	'inbox',
	'planner',
	'butler-automation',
	'power-ups',
	'templates',
	'integrations',
	'tour',
	'teams/marketing',
	'teams/product',
	'teams/engineering',
	'teams/design',
	'teams/startups',
	'teams/remote-team-management',
	'use-cases/task-management',
	'use-cases/resource-hub',
	'use-cases/project-management',
	'use-cases',
	'standard',
	'premium',
	'enterprise',
	'pricing',
	'blog/trello',
	'guide',
	'guide/remote-work',
	'webinars',
	'customers',
	'trello/developers',
	'trello/trello/help',
	'about',
	'company/careers',
	'platforms',
	'contact',
]

export const colors = {
	primary: '#0065ff',
	white: '#ffffff',
	whiteBackground: '#f3f3f5',
	black: '#000000',
	gray: '#7A8599',
	darkBlue: '#091e42',
	darkBlueHover: '#1d478f',
	violet: '#6554c0',
	blueText: '#172b4d',
	blueBackground: '#002e90',
	iconBackground: '#dbeafe',
	yellow: '#ffc400',
	yellowLight: '#fffcef',
	blueLight: '#00c7e5',
	pink: '#f99cdb',
	blackShadow: '#344563',
	violetLight: '#f7f5ff',
	grayLight: '#505f79',
	blackBackground: '#1d2125',

	grayBackgroundNavbarLogged: '#282e33',
	grayBackgroundNavbarLoggedHover: '#333c43',

	grayBordersAccountMenu: '#8c9bab',
	textAccountMenu: '#b6c2cf',
	hoverItemAccountMenu: '#323940',
	accountMenuSelectedItem: '#1c2b41',
	backgroundAccountMenu: '#282e33',

	avatarPrimaryText: '#B6C2CF ',
	avatarSecondaryText: '#9FADBC',
	borderMenuAccount: '#39424a',

	hover1: 'rgba(255, 250, 229, 0.5)',
	hover2: 'rgba(222, 235, 255, 0.5)',
	hover3: 'rgba(255, 242, 251, 0.5)',
	hover4: 'rgba(255, 235, 229, 0.5)',
	hover5: 'rgba(230, 252, 255, 0.5)',
	hover6: 'rgba(227, 252, 239, 0.5)',
}

export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'
