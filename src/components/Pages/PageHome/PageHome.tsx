'use client'
import CustomModal from '@/components/CustomModal/CustomModal'
import PageContainer from '@/components/pageContainer/PageContainer'
import VideoBox from '@/components/VideoBox/VideoBox'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'
import Section3 from './components/Section3/Section3'
import Section4 from './components/Section4/Section4'
import Section5 from './components/Section5/Section5'
import { colorsLanding } from '@/constants'

/**
 * PageHome component
 *
 * PageHome component is the main component of the home page.
 * It contains the sections 1, 2, 3, 4 and 5.
 * Section 1 contains the hero section with a video as the background.
 * Section 2 contains the feature section with a title, a subtitle and a call-to-action.
 * Section 3 contains the testimonial section with a title, a subtitle and a call-to-action.
 * Section 4 contains the feature section with a title, a subtitle and a call-to-action.
 * Section 5 contains the contact section with a title, a subtitle and a call-to-action.
 */
const PageHome = () => {
	return (
		<>
			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection1}>
				<Section1 />
				<CustomModal
					styles={{ width: '720px', height: 'auto', maxWidth: '80%' }}
				>
					<VideoBox VideoSrc="/assets/video/VideoTrello.mp4" />
				</CustomModal>
			</PageContainer>
			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection2}>
				<Section2 />
			</PageContainer>
			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection3}>
				<Section3 />
			</PageContainer>
			<PageContainer
				backgroundColor={colorsLanding.homePageBackgroundSection4}
				margin="-175px 0 0 0"
			>
				<Section4 />
			</PageContainer>
			<PageContainer backgroundColor={colorsLanding.homePageBackgroundSection5}>
				<Section5 />
			</PageContainer>
		</>
	)
}

export default PageHome
