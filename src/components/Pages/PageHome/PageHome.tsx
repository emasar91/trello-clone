'use client'
import CustomModal from '@/components/CustomModal/CustomModal'
import PageContainer from '@/components/pageContainer/PageContainer'
import VideoBox from '@/components/VideoBox/VideoBox'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'
import Section3 from './components/Section3/Section3'
import Section4 from './components/Section4/Section4'
import Section5 from './components/Section5/Section5'

/**
 * PageHome component that renders a video and a description of the product.
 *
 * @returns {React.ReactElement} The PageHome component.
 */
const PageHome = () => {
	return (
		<>
			<PageContainer backgroundColor="rgb(244,245,247)">
				<Section1 />
				<CustomModal styles={{ width: '720px', height: '405px' }}>
					<VideoBox VideoSrc="/assets/video/VideoTrello.mp4" />
				</CustomModal>
			</PageContainer>
			<PageContainer backgroundColor="rgb(255,255,255,255)">
				<Section2 />
			</PageContainer>
			<PageContainer backgroundColor="rgb(0,101,255)">
				<Section3 />
			</PageContainer>
			<PageContainer backgroundColor="rgb(255,255,255)" margin="-175px 0 0 0">
				<Section4 />
			</PageContainer>
			<PageContainer backgroundColor="rgb(255,255,255)">
				<Section5 />
			</PageContainer>
		</>
	)
}

export default PageHome
