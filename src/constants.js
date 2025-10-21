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

export const colorTokens = {
	brandPrimary: '#0065ff',
	white: '#ffffff',
	black: '#000000',
	gray: '#7A8599',
	grayLight: '#505f79',
	whiteBackground: '#f3f3f5',
	violet: '#6554c0',
	violetLight: '#f7f5ff',
	pink: '#f99cdb',
	blueLight: '#00c7e5',
	yellow: '#ffc400',
	yellowLight: '#fffcef',

	darkBlue: '#091e42',
	darkBlueHover: '#1d478f',
	blueText: '#172b4d',
	blueBackground: '#002e90',
	iconBackground: '#dbeafe',
	blackShadow: '#344563',
	violetLight: '#f7f5ff',
	blackBackground: '#1f1f21',
}

export const colorsLanding = {
	shadow: 'rgba(0, 0, 0, 0.1)',
	//navbar
	loginButton: colorTokens.brandPrimary,
	textLoginButton: colorTokens.white,
	backgroundNavbar: colorTokens.white,
	textTabs: colorTokens.darkBlue,
	textTabsHover: colorTokens.brandPrimary,
	textTabsActive: colorTokens.brandPrimary,
	textTabsActiveText: colorTokens.brandPrimary,
	textTabsActiveUnderline: colorTokens.brandPrimary,
	textTabsText: colorTokens.black,

	itemHover1: 'rgba(255, 250, 229, 0.5)',
	itemHover2: 'rgba(222, 235, 255, 0.5)',
	itemHover3: 'rgba(255, 242, 251, 0.5)',
	itemHover4: 'rgba(255, 235, 229, 0.5)',
	itemHover5: 'rgba(230, 252, 255, 0.5)',
	itemHover6: 'rgba(227, 252, 239, 0.5)',

	//boxinfo extrainfo navbar
	boxInfoBackground: colorTokens.white,
	boxInfoExtraInfoBackground: colorTokens.violetLight,
	boxInfoExtraInfoTitle: colorTokens.darkBlue,
	boxInfoExtraInfoItemsTitle: colorTokens.darkBlue,
	boxInfoExtraInfoLink: colorTokens.darkBlue,
	boxInfoExtraInfoLinkBackground: colorTokens.white,
	boxInfoExtraInfoLinkBorder: colorTokens.violet,
	boxInfoExtraInfoLinkHover: colorTokens.violetLight,
	boxInfoExtraInfoIcon: colorTokens.brandPrimary,
	boxInfoExtraInfoTitleBorder: colorTokens.violet,

	//boxinfo extrainfo navbar
	boxInfoTitle: colorTokens.darkBlue,
	boxInfoTitleBorder: colorTokens.whiteBackground,
	boxInfoLink: colorTokens.darkBlue,
	boxInfoItemTitle: colorTokens.darkBlue,
	boxInfoItemDescription: colorTokens.grayLight,
	boxInfoFullWidthButtonBackground: colorTokens.white,
	boxInfoFullWidthButtonContainer: colorTokens.yellowLight,
	boxInfoFullWidthButtonContainerTitle: colorTokens.black,
	boxInfoFullWidthButtonContainerDescription: colorTokens.darkBlue,
	boxInfoFullWidthButtonHover: colorTokens.yellowLight,
	boxInfoFullWidthButtonText: colorTokens.darkBlue,
	boxInfoFullWidthButtonBorder: colorTokens.yellow,

	//footer
	footerBackground: colorTokens.darkBlue,
	footerTitle: colorTokens.white,
	footerTitleBorder: colorTokens.white,
	footerSubtitle: colorTokens.white,
	footerItemHover: colorTokens.blackShadow,

	//mockpage
	mockPageBackground: colorTokens.blueBackground,
	mockPageLoginButtonBackground: colorTokens.brandPrimary,
	mockPageLoginButtonText: colorTokens.white,
	mockPageTitle: colorTokens.blueText,
	mockPageSubTitle: colorTokens.gray,
	mockPageDescription: colorTokens.darkBlue,
	mockPageDescriptionContainerBackground: colorTokens.iconBackground,
	mockPageIconContainerBackground: colorTokens.iconBackground,
	//404 page
	page404Background: colorTokens.blueBackground,
	page404LoginButtonBackground: colorTokens.brandPrimary,
	page404LoginButtonText: colorTokens.white,
	page404Title: colorTokens.blueText,
	page404SubTitle: colorTokens.gray,
	page404Description: colorTokens.darkBlue,
	page404DescriptionContainerBackground: colorTokens.iconBackground,
	page404IconContainerBackground: colorTokens.iconBackground,

	//login page
	loginPageBackground: colorTokens.blueBackground,
	loginPageContainerForm: colorTokens.white,
	loginPageContainerFormShadow: colorTokens.blackShadow,
	loginPageFormResetPasswordButton: colorTokens.gray,
	loginPageFormSubmitButtonBackground: colorTokens.brandPrimary,
	loginPageFormSubmitButtonText: colorTokens.white,

	//register page
	registerPageBackground: colorTokens.blueBackground,

	//reset password page
	resetPasswordPageBackground: colorTokens.blueBackground,

	//home page
	homePageBackgroundSection1: colorTokens.whiteBackground,
	homePageBackgroundSection2: colorTokens.white,
	homePageBackgroundSection3: colorTokens.brandPrimary,
	homePageBackgroundSection4: colorTokens.white,
	homePageBackgroundSection5: colorTokens.white,

	//home page section 1
	homePageSection1Container: colorTokens.whiteBackground,
	homePageSection1Title: colorTokens.darkBlue,
	homePageSection1ButtonVideo: colorTokens.brandPrimary,

	//home page section 2
	homePageSection2SubTitle: colorTokens.darkBlue,
	homePageSection2Description: colorTokens.darkBlue,
	homePageSection2SliderBackground: colorTokens.darkBlue,
	homePageSection2SliderBackgroundActive: colorTokens.gray,
	homePageSection2SliderBackgroundHover: colorTokens.iconBackground,
	homePageSection2SliderBackgroundHoverActive: colorTokens.iconBackground,

	//home page section 3
	homePageSection3Title: colorTokens.white,
	homePageSection3SubTitle: colorTokens.white,
	homePageSection3CardDescription: colorTokens.darkBlue,
	homePageSection3CardTitle: colorTokens.darkBlue,
	homePageSection3CardBackground: colorTokens.white,
	homePageSection3CardBackgroundShadow: colorTokens.blackShadow,

	//home page section 4
	homePageSection4Title: colorTokens.darkBlue,
	homePageSection4SubTitle: colorTokens.darkBlue,
	homePageSection4Description: colorTokens.darkBlue,
	homePageSection4CardButtonBackground: colorTokens.white,
	homePageSection4CardButtonBackgroundHover: colorTokens.violetLight,
	homePageSection4CardButtonBorder: colorTokens.brandPrimary,
	homePageSection4CardButtonText: colorTokens.blueText,
	homePageSection4CardTitle: colorTokens.darkBlue,
	homePageSection4CardDescription: colorTokens.darkBlue,
	homePageSection4CardBackground: colorTokens.whiteBackground,

	//custom slider
	customSlider: colorTokens.darkBlue,
	customSliderDot: colorTokens.darkBlue,
	customSliderDotActive: colorTokens.gray,
	customSliderArrowRightBackground: colorTokens.whiteBackground,
	customSliderArrowRightHover: colorTokens.blueLight,
	customSliderArrowLeftBackground: colorTokens.whiteBackground,
	customSliderArrowLeftHover: colorTokens.blueLight,
	customSliderLeftItemsDescription: colorTokens.darkBlue,
	customSliderLeftItemsTitle: colorTokens.darkBlue,
	customSliderLeftItemsActiveBorder: colorTokens.blueLight,
	customSliderLeftItemsActiveBackground: colorTokens.white,
}
export const colorDark = {
	...colorTokens,
	loginButton: colorTokens.brandPrimary,
	brandPrimaryHover: '#85b8ff',
	blackBackground: colorTokens.blackBackground,
	blackBackgroundLight: '#22272b',
	blackBackgroundHover: '#2b2c2f',
	blackBackgroundMenu: '#2b2c2f',
	blackBackgroundLightHover: '#333c43',
	brandPrimary: '#579dff',
	grayLight: '#8c9bab',
	blueBackgroundSelected: '#1c2b41',
	gray: '#39424a',
	grayLightHover: '#323940',
	grayTextAvatar: '#B6C2CF',
	grayTextItems: '#B6C2CF',
	grayTextAvatarSecondary: '#9FADBC',
	grayCreateBoard: '#2c2c2e',
}

export const colorLight = {
	...colorTokens,
	loginButton: colorTokens.brandPrimary,
	blackBackground: colorTokens.whiteBackground,
	brandPrimary: colorTokens.brandPrimary,
}

export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'

export const BACKGROUND_IMAGES = [
	'fondo1.jpg',
	'fondo2.jpg',
	'fondo3.jpg',
	'fondo4.jpg',
	'fondo5.jpg',
	'fondo6.jpg',
]

export const AVATAR_BACKGROUND = [
	'rgba(103, 162, 239, 1)',
	'rgba(108, 194, 225, 1)',
	'rgba(255, 153, 204, 1)',
	'rgba(255, 102, 153, 1)',
	'rgba(255, 204, 153, 1)',
	'rgba(255, 153, 102, 1)',
	'rgba(153, 204, 153, 1)',
	'rgba(102, 153, 102, 1)',
	'rgba(204, 153, 255, 1)',
	'rgba(153, 102, 255, 1)',
]

export const API = {
	createWorkspacesUrl: '/api/workspaces',
	getWorkspacesUrl: '/api/workspaces',
	createBoardsUrl: '/api/boards',
	updateWorkspacesUrl: '/api/workspaces',
	getBoardByNameUrl: '/api/boards',
	getBoardColumnsUrl: '/api/columns',
	createColumnUrl: '/api/columns',
	getCardsByColumnUrl: '/api/cards',
}
