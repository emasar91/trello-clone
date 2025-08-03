'use client'
import CustomModal from '@/components/CustomModal/CustomModal'
import PageContainer from '@/components/pageContainer/PageContainer'
import VideoBox from '@/components/VideoBox/VideoBox'
import Section1 from './components/Section1'

/**
 * PageHome component that renders a video and a description of the product.
 *
 * @returns {React.ReactElement} The PageHome component.
 */
const PageHome = () => {
	return (
		<PageContainer backgroundColor="rgba(243,243,245,255)">
			<Section1 />
			<CustomModal styles={{ width: '720px', height: '405px' }}>
				<VideoBox VideoSrc="/assets/video/VideoTrello.mp4" />
			</CustomModal>
		</PageContainer>
	)
}

export default PageHome
