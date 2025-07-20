export const tabsNavbar = [
	{
		tab: 'features',
		drawer: {
			items: [
				{ title: 'inbox', description: 'inboxDescription' },
				{ title: 'planner', description: 'plannerDescription' },
				{ title: 'automation', description: 'automationDescription' },
				{ title: 'power-ups', description: 'powerUpsDescription' },
				{ title: 'templates', description: 'templatesDescription' },
				{ title: 'integrations', description: 'integrationsDescription' },
			],
			extraInfo: {
				title: 'featuresExtraTitle',
				description: 'featuresExtraDescription',
				button: 'featuresExtraButton',
			},
		},
	},
	{
		tab: 'solutions',
		drawer: {
			items: [
				{ title: 'marketingTeams', description: 'marketingTeamsDescription' },
				{
					title: 'productManagement',
					description: 'productManagementDescription',
				},
				{
					title: 'engineeringTeams',
					description: 'engineeringTeamsDescription',
				},
				{ title: 'designTeams', description: 'designTeamsDescription' },
				{ title: 'startups', description: 'startupsDescription' },
				{ title: 'remoteTeams', description: 'remoteTeamsDescription' },
			],
			extraInfo: {
				title: 'solutionsExtraTitle',
				link: 'solutionsExtraLink',
				items: [
					{ title: 'title1', description: 'description1' },
					{ title: 'title2', description: 'description2' },
					{ title: 'title3', description: 'description3' },
				],
			},
		},
	},
	{
		tab: 'plans',
		drawer: {
			items: [
				{ title: 'standard', description: 'standardDescription' },
				{ title: 'premium', description: 'premiumDescription' },
				{ title: 'enterprise', description: 'enterpriseDescription' },
				{ title: 'free', description: 'freeDescription', button: 'freeButton' },
			],
			extraInfo: {
				title: 'plansExtraTitle',
				description: 'plansExtraDescription',
				button: 'plansExtraButton',
			},
		},
	},
	{ tab: 'pricing' },
	{
		tab: 'resources',
		drawer: {
			items: [
				{ title: 'trelloGuide', description: 'trelloGuideDescription' },
				{ title: 'remoteWorkGuide', description: 'remoteWorkGuideDescription' },
				{ title: 'webinars', description: 'webinarsDescription' },
				{
					title: 'customersStories',
					description: 'customersStoriesDescription',
				},
				{ title: 'developers', description: 'developersDescription' },
				{ title: 'helpResources', description: 'helpResourcesDescription' },
			],
			extraInfo: {
				title: 'resourcesExtraTitle',
				description: 'resourcesExtraDescription',
				button: 'resourcesExtraButton',
			},
		},
	},
]

export const colors = {
	textNavbarSelected: 'rgb(0, 101, 255)',
	textNavbar: '#000000',
}
