import { JSX } from 'react'
import { AutomationIcon } from './Automation'
import { InboxIcon } from './InboxIcon'
import { IntegrationIcon } from './IntegrationsIcon'
import { PlannerIcon } from './PlannerIcon'
import { PowerUpsIcon } from './PowerUpsIcon'
import { TemplatesIcon } from './TemplatesIcon'
import { MarketingTeamsIcon } from './MarketingTeamsIcon'
import { ProductManagementIcon } from './ProductManagementIcon'
import { EngineeringTeamIcon } from './EngineeringTeamIcon'
import { DesingTeamIcon } from './DesignTeamIcon'
import { StartupsIcon } from './StartupsIcon'
import { RemoteTeamsIcon } from './RemoteTeamsIcon'
import { StandardIcon } from './StandardIcon'
import { PremiumIcon } from './PremiumIcon'
import { EnterpriseIcon } from './EnterpriseIcon'
import { FreeIcon } from './FreeIcon'

export const IconsDrawer = ({ icon }: { icon: string }): JSX.Element => {
	const icons = {
		inbox: <InboxIcon />,
		planner: <PlannerIcon />,
		automation: <AutomationIcon />,
		'power-ups': <PowerUpsIcon />,
		templates: <TemplatesIcon />,
		integrations: <IntegrationIcon />,

		marketingTeams: <MarketingTeamsIcon />,
		productManagement: <ProductManagementIcon />,
		engineeringTeams: <EngineeringTeamIcon />,
		designTeams: <DesingTeamIcon />,
		startups: <StartupsIcon />,
		remoteTeams: <RemoteTeamsIcon />,

		standard: <StandardIcon />,
		premium: <PremiumIcon />,
		enterprise: <EnterpriseIcon />,

		free: <FreeIcon />,
	}
	return icons[icon as keyof typeof icons]
}
